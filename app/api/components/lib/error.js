class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  
  class InvalidActionError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidActionError';
    }
  }
  
  export { NotFoundError, InvalidActionError };
  