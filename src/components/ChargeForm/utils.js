import chargeActions from '../../context/useCharge2/chargeActions';

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export const clearedForm = (defaultPercent, refund) => {
  return {
    date: new Date().toDateInputValue(),
    image: '',
    name: '',
    percent: defaultPercent || 0,
    refund: refund || 0,
    total: ''
  };
};

export const getChargeFromHtml = () => {
  const charge = {};
  document.querySelectorAll('.field input').forEach(input => {
    let value = input.value;

    if (input.name === 'total' || input.name === 'percent') {
      value = chargeActions.numOr0(value);
    }

    charge[input.name] = value;
  });

  charge.refund = chargeActions.twoDecimals(
    (charge.total * charge.percent) / 100
  );

  return charge;
};
