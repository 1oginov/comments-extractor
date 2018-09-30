const esprima = require('esprima');
const fs = require('fs');
const glob = require('glob');

/**
 * Comments Extractor class.
 */
class CommentsExtractor {
  /**
   * Comments Extractor constructor.
   * @param {string} pattern Glob pattern
   * @param {string} [annotation=''] Annotation
   * @param {Object} [options={}] Glob options
   * @param {*} [esprimaClass=esprima]
   * @param {*} [fsClass=fs]
   * @param {*} [globClass=glob]
   */
  constructor(pattern, annotation = '', options = {}, esprimaClass = esprima,
      fsClass = fs, globClass = glob) {
    this.annotation = annotation;
    this.esprima = esprimaClass;
    this.fs = fsClass;
    this.glob = globClass;
    this.options = options;
    this.pattern = pattern;
  }

  /**
   * Extract comments.
   * @return {Map<string, Array>}
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
   * @param {Array} comments
   * @param {string} annotation
   * @return {Array}
   */
  filterAnnotatedComments(comments, annotation) {
    return comments.filter((comment) => comment.value.toLowerCase().
        indexOf('@' + annotation.toLowerCase()) >= 0);
  }

  /**
   * Get comments.
   * @param {string} data
   * @param {*} [esprima=this.esprima]
   * @return {Array}
   */
  getComments(data, esprima = this.esprima) {
    return esprima.parseModule(data, {
      comment: true,
    }).comments;
  }

  /**
   * Get file data.
   * @param {string} path
   * @param {*} [fs=this.fs]
   * @return {string}
   */
  getFileData(path, fs = this.fs) {
    return fs.readFileSync(path, 'utf-8');
  }

  /**
   * Get files fitting pattern.
   * @param {string} pattern
   * @param {Object} [options={}]
   * @param {*} [glob=this.glob]
   * @return {Array}
   */
  getFiles(pattern, options = {}, glob = this.glob) {
    return glob.sync(pattern, options);
  }
}

module.exports = CommentsExtractor;
