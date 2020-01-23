import chargeActions from '../../context/useCharge2/chargeActions';

// eslint-disable-next-line
Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export const clearedForm = (defaultPercent, refund) => {
  return {
    date: new Date().toDateInputValue(),
    images: { original: '', medium: '', thumb: '' },
    name: '',
    percent: defaultPercent || 0,
    refund: refund || 0,
    total: ''
  };
};

export const getChargeFromHtml = images => {
  const charge = {};
  document.querySelectorAll('.field input').forEach(input => {
    let value = input.value;

    if (input.name === 'total' || input.name === 'percent') {
      value = chargeActions.numOr0(value);
    }

    charge[input.name] = value;
  });

  charge.total = chargeActions.setDecimal(charge.total, 2);
  charge.percent = chargeActions.setDecimal(charge.percent, 3);
  charge.refund = chargeActions.setDecimal(
    (charge.total * charge.percent) / 100,
    2
  );

  charge.images = { ...images };

  return charge;
};
