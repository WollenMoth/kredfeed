describe('index tests', () => {
  it('should create app', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index');
  });
});

export {};
