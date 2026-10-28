==========================================================================

Qualtrics.SurveyEngine.addOnload(function () {});

Qualtrics.SurveyEngine.addOnReady(function () {
  var root = this.getQuestionContainer().querySelector('#abA') || document.getElementById('abA');
  if (!root) return;

  var PRICE = 189, start = Date.now();
  var qty = 1, ctaClicks = 0, abandonClicks = 0, firstClick = '', checkoutMs = '', checkedOut = 0, finalQty = 0;
  function el(id) { return root.querySelector('#' + id); }
  function money(n) { return '$' + n.toLocaleString('en-US'); }
  function save() {
    var E = Qualtrics.SurveyEngine;
    E.setEmbeddedData('condition', 'A_BuyNow');
    E.setEmbeddedData('ctaClicks', String(ctaClicks));
    E.setEmbeddedData('quantity', String(finalQty));
    E.setEmbeddedData('checkout', String(checkedOut));
    E.setEmbeddedData('msToFirstClick', String(firstClick));
    E.setEmbeddedData('msToCheckout', String(checkoutMs));
    E.setEmbeddedData('abandonClicks', String(abandonClicks));
  }
  function show(node, on) { node.classList[on ? 'remove' : 'add']('is-hidden'); }
  function renderQty() {
    el('abA-qty').textContent = qty;
    el('abA-total').textContent = money(PRICE * qty);
    el('abA-checkout').textContent = 'Checkout · ' + money(PRICE * qty);
    el('abA-dec').disabled = qty <= 1;
  }
  function closeSheet() { abandonClicks++; show(el('abA-sheet'), false); save(); }

  el('abA-buy').addEventListener('click', function () {
    ctaClicks++;
    if (firstClick === '') firstClick = Date.now() - start;
    show(el('abA-sheet'), true); save();
  });
  el('abA-inc').addEventListener('click', function () { qty = Math.min(9, qty + 1); renderQty(); });
  el('abA-dec').addEventListener('click', function () { qty = Math.max(1, qty - 1); renderQty(); });
  el('abA-keep').addEventListener('click', closeSheet);
  el('abA-scrim').addEventListener('click', closeSheet);
  el('abA-checkout').addEventListener('click', function () {
    checkedOut = 1; finalQty = qty;
    if (checkoutMs === '') checkoutMs = Date.now() - start;
    el('abA-summary').textContent = qty + (qty === 1 ? ' pair' : ' pairs') + ' of Headphones · ' + money(PRICE * qty);
    show(el('abA-sheet'), false); show(el('abA-done'), true); save();
  });
  el('abA-reset').addEventListener('click', function () {
    qty = 1; renderQty(); show(el('abA-done'), false);
  });

  renderQty(); save();
});

Qualtrics.SurveyEngine.addOnUnload(function () {});


==========================================================================
