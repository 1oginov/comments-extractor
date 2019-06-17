const esprima = require('esprima');
const fs = require('fs');
const glob = require('glob');

/**
 * Comments Extractor class.
 */
class CommentsExtractor {
  /**
   * Comments Extractor constructor.
   *
   * @param {string} pattern - Glob pattern.
   * @param {string} [annotation=''] - Annotation.
   * @param {object} [options={}] - Glob options.
   * @param {*} [esprimaClass=esprima] - Esprima class.
   * @param {*} [fsClass=fs] - Fs class.
   * @param {*} [globClass=glob] - Glob class.
   */
  constructor(pattern, annotation = '', options = {}, esprimaClass = esprima, fsClass = fs, globClass = glob) {
    this.annotation = annotation;
    this.esprima = esprimaClass;
    this.fs = fsClass;
    this.glob = globClass;
    this.options = options;
    this.pattern = pattern;
  }

  /**
   * Extract comments.
   *
   * @returns {Map<string, Array>} Map of filepath to array of comments.
   */
  extract() {
    const files = this.getFiles(this.pattern, this.options);
    const filesToComments = new Map;

    files.map((file) => {
      const data = this.getFileData(file);
      let comments = this.getComments(data);

      if (this.annotation.length > 0) {
        comments = this.filterAnnotatedComments(comments, this.annotation);
      }

      filesToComments.set(file, comments);
    });

    return filesToComments;
  }

  /**
   * Filter annotated comments only.
   *
   * @param {Array} comments - Comments.
   * @param {string} annotation - Annotation.
   * @returns {Array} Annotated comments array.
   */
  filterAnnotatedComments(comments, annotation) {
    return comments.filter((comment) => comment.value.toLowerCase().indexOf('@' + annotation.toLowerCase()) >= 0);
  }

  /**
   * Get comments.
   *
   * @param {string} data - Data.
   * @param {*} [esprima=this.esprima] - Esprima class.
   * @returns {Array} Comments array.
   */
  getComments(data, esprima = this.esprima) {
    return esprima.parseModule(data, {
      comment: true,
    }).comments;
  }

  /**
   * Get file data.
   *
   * @param {string} path - Path.
   * @param {*} [fs=this.fs] - Fs class.
   * @returns {string} File data.
   */
  getFileData(path, fs = this.fs) {
    return fs.readFileSync(path, 'utf-8');
  }

  /**
   * Get files fitting pattern.
   *
   * @param {string} pattern - Pattern.
   * @param {object} [options={}] - Options.
   * @param {*} [glob=this.glob] - Glob class.
   * @returns {Array} Files array.
   */
  getFiles(pattern, options = {}, glob = this.glob) {
    return glob.sync(pattern, options);
  }
}

module.exports = CommentsExtractor;
