import navigate from '../Router/Router';

const links = ['garage', 'winners'];

const Navbar = () => {
  const component = document.createElement('div');

  const navLinks = links.map((el) => {
    const link = document.createElement('button');
    link.textContent = el;
    link.addEventListener('click', () => {
      navigate(el);
    });

    return link;
  });

  component.append(...navLinks);

  return component;
};

export default Navbar;
