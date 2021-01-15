'use strict'

/**
 * Binds event listeners to form elements on load
 */
window.addEventListener('load', function () {
  const changingCells = document.querySelectorAll('#travelExp input.sum')
  const submitButton = document.getElementById('submitButton')

  for (const cell of changingCells) {
    cell.onchange = calcExp
  }

  submitButton.onclick = validateSummary
})

/**
 * Validates the data entry in the summary field.
 */
function validateSummary () {
  const summary = document.getElementById('summary')
  if (summary.validity.valueMissing) {
    summary.setCustomValidity('You must include a summary of the trip in your report.')
  } else {
    summary.setCustomValidity('')
  }
};

/**
 * Sums up all of the data values for elements of the sumClass class.
 */
function calcClass (sumClass) {
  const sumFields = document.getElementsByClassName(sumClass)
  let sumTotal = 0

  for (const sumField of sumFields) {
    const itemValue = parseFloat(sumField.value)

    if (!isNaN(itemValue)) {
      sumTotal += itemValue
    }
  }

  return sumTotal
};
/**
 * Calculates the travel expenses from all categories and dates.
 */
function calcExp () {
  const expTable = document.querySelectorAll('#travelExp tbody tr')

  for (let i = 0; i < expTable.length; i++) {
    document.getElementById('subtotal' + i).value = formatNumber(calcClass('date' + i), 2)
  }

  document.getElementById('transTotal').value = formatNumber(calcClass('trans'), 2)
  document.getElementById('lodgeTotal').value = formatNumber(calcClass('lodge'), 2)
  document.getElementById('mealTotal').value = formatNumber(calcClass('meal'), 2)
  document.getElementById('otherTotal').value = formatNumber(calcClass('other'), 2)
  document.getElementById('expTotal').value = formatUSCurrency(calcClass('sum'))
}

/**
 * Formats the value, "val" to the number of decimals indicated
 * by "decimals", adding thousands separators.
 */
function formatNumber (val, decimals) {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Formats the value, "val", as U.S. currency.
 */
function formatUSCurrency (val) {
  return val.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
