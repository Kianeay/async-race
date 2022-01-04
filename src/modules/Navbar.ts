import navigate from '../Router/Router';

const links = ['garage', 'winners'];

const Navbar = () => {
  const component = document.createElement('nav');
  component.className = 'nav';

  const navLinks = links.map((el) => {
    const link = document.createElement('button');
    link.textContent = `To ${el}`;
    link.className = 'button nav__btn';
    link.addEventListener('click', () => {
      navigate(el);
    });

    return link;
  });

  component.append(...navLinks);

  return component;
};

export default Navbar;
