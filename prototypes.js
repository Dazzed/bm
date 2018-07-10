Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype._removeProperty = function (prop) {
  this.map(elem => {
    delete elem[prop];
    return elem;
  });
};
