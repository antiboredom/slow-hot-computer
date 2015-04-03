self.addEventListener('message', function(e) {
  self.postMessage(prime(e.data));
}, false);

function prime (number) {
  if (number === 1) {
    return false;

  } else if (number < 4) {
    return true;

  } else if (number % 2 === 0) {
    return false;

  } else if (number < 9) {
    return true;

  } else if (number % 3 === 0) {
    return false;

  } else {
    var rounded = Math.floor(Math.sqrt(number));
    var factor = 5;
    while (factor <= rounded) {
      if (number % factor === 0) {
        return false;
      }
      if (number % (factor + 2) === 0) {
        return false;
      }
      factor += 6;
    }
  }

  return true;
}
