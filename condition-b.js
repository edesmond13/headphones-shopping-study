==========================================================================

Qualtrics.SurveyEngine.addOnload(function () {});

Qualtrics.SurveyEngine.addOnReady(function () {
  var root = this.getQuestionContainer().querySelector('#abB') || document.getElementById('abB');
  if (!root) return;

  var PRICE = 189, start = Date.now();
  var count = 0, ctaClicks = 0, firstClick = '', checkoutMs = '', checkedOut = 0, finalQty = 0;
  function el(id) { return root.querySelector('#' + id); }
  function money(n) { return '$' + n.toLocaleString('en-US'); }
  function save() {
    var E = Qualtrics.SurveyEngine;
    E.setEmbeddedData('condition', 'B_CartIcon');
    E.setEmbeddedData('ctaClicks', String(ctaClicks));
    E.setEmbeddedData('quantity', String(finalQty));
    E.setEmbeddedData('checkout', String(checkedOut));
    E.setEmbeddedData('msToFirstClick', String(firstClick));
    E.setEmbeddedData('msToCheckout', String(checkoutMs));
    E.setEmbeddedData('abandonClicks', '0');
  }
  function show(node, on) { node.classList[on ? 'remove' : 'add']('is-hidden'); }
  function line() { return count + (count === 1 ? ' item' : ' items') + ' · ' + money(PRICE * count); }

  el('abB-cart').addEventListener('click', function () {
    ctaClicks++;
    if (firstClick === '') firstClick = Date.now() - start;
    count = Math.min(9, count + 1);
    el('abB-badge').textContent = count;
    el('abB-line').textContent = line();
    el('abB-cart').setAttribute('aria-label', 'Add another to cart, ' + count + ' in cart');
    show(el('abB-badge'), true); show(el('abB-toast'), true); save();
  });
  el('abB-checkout').addEventListener('click', function () {
    checkedOut = 1; finalQty = count;
    if (checkoutMs === '') checkoutMs = Date.now() - start;
    el('abB-summary').textContent = line();
    show(el('abB-toast'), false); show(el('abB-done'), true); save();
  });
  el('abB-reset').addEventListener('click', function () {
    count = 0;
    el('abB-cart').setAttribute('aria-label', 'Add to cart');
    show(el('abB-badge'), false); show(el('abB-done'), false);
  });

  save();
});

Qualtrics.SurveyEngine.addOnUnload(function () {});
