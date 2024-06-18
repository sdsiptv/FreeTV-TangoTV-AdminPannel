import { toast } from 'react-toastify';

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397),
        )
    : isoCode;
}

function toastMessage(message) {
  toast.success(message, {
    position: 'top-right',
    autoClose: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

function failureNotification(message) {
  toast.error(message, {
    position: 'top-right',
    autoClose: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

function findPackageId(packageData, selectedpackages) {
  // selectedpackages - has index of package selected
  // return corresponsing package_id for the given index
  let data = selectedpackages.map(ele => {
    return packageData[ele].package_id;
  });
  return data;
}

function arraySetNot(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function arraySetIntersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export {
  countryToFlag,
  toastMessage,
  arraySetNot,
  arraySetIntersection,
  findPackageId,
  failureNotification,
};
