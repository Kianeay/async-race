const navigate = (page: string) => {
  history.pushState({ page }, '', page);
  window.dispatchEvent(
    new CustomEvent('app:router:pageChange', { detail: { page } }),
  );
};

export default navigate;
