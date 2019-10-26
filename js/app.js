class App {
  constructor() {
    this.url = 'https://api.github.com';
    this.main = document.getElementById('app');
    const $create = (tag = 'div', attrs = {}, text = '') => {
      const node = document.createElement(tag);
      Object.keys(attrs).forEach((name) => {
        node.setAttribute(name, attrs[name]);
      });
      node.textContent = text;
      return node;
    };
    this.renderData = (name, description, html_url, homepage) => {
      const title = $create('a', { class: 'text-decoration-none fs-l', href: html_url, target: '_blank' }, name);
      const descriptionDiv = $create('div', { class: 'text-muted' }, description);
      const homepageLink = $create('a', { class: 'text-decoration-none text-info', href: homepage, target: '_blank' }, 'homepage');
      const section = $create('section', { class: 'w-450 p-2 mx-auto mb-3 bg-light-t b-tl-r bs' });
      section.appendChild(title);
      section.appendChild(descriptionDiv);
      section.appendChild(homepageLink);
      this.main.appendChild(section);
    }
  }

  async fetchData() {
    const endpoint = `${this.url}/user/repos?sort=pushed`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.nightshade-preview+json',
          'Authorization': 'token 90570b3d69d554be50981e753eafb3755cd8fef9',
        },
      });
      if (response.ok) {
        const data = await response.json();
        data.forEach(repo => {
          const {
            name,
            description,
            html_url,
            homepage,
          } = repo;
          this.renderData(name, description, html_url, homepage);
        });
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { App as default };
