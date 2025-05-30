// Replace GTM-EXAMPLE with your actual Google Tag Manager (GTM) container ID.
// In your Shopify admin, navigate to Settings.
// From the left-hand menu, click Customer Events.
// Click Add Custom Pixel. Give it a name (e.g., Google Tag Manager).
// Configure Privacy:
//  - if you're not using Shopify's cookie banner, set Permission to Not Required.
//  - this allows GTM to trigger on all actions site-wide.
// Set Data Sale Preferences:
//  - if you’re not using Shopify’s data sales opt-out page, select “Data collected does not qualify as a data sale.”

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Load GTM
(function(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-EXAMPLE');

// Helper to map items
function mapItems(lineItems, variantPath = 'variant') {
  return lineItems?.map(item => ({
    item_id: item?.[variantPath]?.product?.id,
    item_name: item?.[variantPath]?.product?.title,
    price: item?.[variantPath]?.price?.amount,
    quantity: item?.quantity
  })) || [];
}

// Common push function
function pushEcommerceEvent(eventName, eventUrl, ecommerceData) {
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: eventName,
    url: eventUrl,
    ecommerce: ecommerceData
  });
}

// Event subscriptions
analytics.subscribe("checkout_completed", (event) => {
  const checkout = event.data?.checkout;
  pushEcommerceEvent("purchase", event.context.document.location.href, {
    currency: checkout?.currencyCode,
    value: checkout?.subtotalPrice?.amount,
    transaction_id: checkout?.order?.id,
    coupon: checkout?.discountAllocations,
    shipping: checkout?.shippingLine?.price?.amount,
    tax: checkout?.totalTax?.amount,
    items: mapItems(checkout?.lineItems)
  });
});

analytics.subscribe("payment_info_submitted", (event) => {
  const checkout = event.data?.checkout;
  pushEcommerceEvent("add_payment_info", event.context.document.location.href, {
    currency: checkout?.currencyCode,
    value: checkout?.subtotalPrice?.amount,
    items: mapItems(checkout?.lineItems)
  });
});

analytics.subscribe("checkout_shipping_info_submitted", (event) => {
  const checkout = event.data?.checkout;
  pushEcommerceEvent("add_shipping_info", event.context.document.location.href, {
    currency: checkout?.currencyCode,
    value: checkout?.subtotalPrice?.amount,
    items: mapItems(checkout?.lineItems)
  });
});

analytics.subscribe("checkout_started", (event) => {
  const checkout = event.data?.checkout;
  pushEcommerceEvent("begin_checkout", event.context.document.location.href, {
    currency: checkout?.currencyCode,
    value: checkout?.subtotalPrice?.amount,
    items: mapItems(checkout?.lineItems)
  });
});

analytics.subscribe("cart_viewed", (event) => {
  const cart = event.data?.cart;
  const items = cart?.lines?.map(item => ({
    item_id: item?.merchandise?.product?.id,
    item_name: item?.merchandise?.product?.title,
    price: item?.merchandise?.price?.amount,
    quantity: item?.quantity
  })) || [];
  pushEcommerceEvent("view_cart", event.context.document.location.href, {
    currency: cart?.cost?.totalAmount?.currencyCode,
    value: cart?.cost?.totalAmount?.amount,
    items: items
  });
});

analytics.subscribe("product_added_to_cart", (event) => {
  const item = event.data?.cartLine;
  pushEcommerceEvent("add_to_cart", event.context.document.location.href, {
    currency: item?.cost?.totalAmount?.currencyCode,
    value: item?.cost?.totalAmount?.amount,
    items: [{
      item_id: item?.merchandise?.product?.id,
      item_name: item?.merchandise?.product?.title,
      price: item?.merchandise?.price?.amount,
      quantity: item?.quantity
    }]
  });
});

analytics.subscribe("product_viewed", (event) => {
  const product = event.data?.productVariant;
  pushEcommerceEvent("view_item", event.context.document.location.href, {
    currency: product?.price?.currencyCode,
    value: product?.price?.amount,
    items: [{
      item_id: product?.product?.id,
      item_name: product?.product?.title,
      price: product?.price?.amount,
      quantity: 1
    }]
  });
});

analytics.subscribe("page_viewed", (event) => {
  dataLayer.push({
    event: "shopify_page_view",
    url: event.context.document.location.href
  });
});
