import { RenderContainer } from '../src/RenderContainer';

describe('RenderContainer', () => {
  test('constructor', () => {
    const container = new RenderContainer();
    expect(container.domNode.getAttribute('data-test-container')).toEqual('true');
    expect(container.mounted).toBeFalsy();
    expect(container.options).toEqual({});

    const containerWithOptions = new RenderContainer({ a: 'b' });
    expect(containerWithOptions.options).toEqual({ a: 'b' });
  });

  test('debug', () => {
    const consoleLog = console.log;
    console.log = jest.fn();

    const container = new RenderContainer();
    container.domNode.innerHTML = '<div id="test"><button id="btn1"></button></div>';
    container.debug();

    expect(console.log).toHaveBeenCalledWith(
      `
<div
  id="test"
>
  <button
    id="btn1"
  />
</div>
    `.trim()
    );

    console.log = consoleLog;
  });

  test('mount/unmount', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.mounted).toBeFalsy();
    expect(document.getElementById('test')).toBeFalsy();

    container.mount();

    expect(container.mounted).toBeTruthy();
    expect(document.getElementById('test')).toBeInstanceOf(HTMLElement);

    const parent = (document.getElementById('test') as HTMLElement).parentNode as HTMLElement;
    expect(parent.tagName).toBe('DIV');
    expect(parent.parentNode).toBe(document.body);

    container.unmount();
    expect(container.mounted).toBeFalsy();
    expect(document.getElementById('test')).toBeFalsy();

    container.unmount();
    expect(container.mounted).toBeFalsy();
    expect(document.getElementById('test')).toBeFalsy();
  });

  test('toString', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = '<div id="test"><button id="btn1"></button></div>';

    expect(container.toString()).toBe(
      `
<div
  id="test"
>
  <button
    id="btn1"
  />
</div>
    `.trim()
    );
  });

  test('count', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.count('#test')).toBe(1);
    expect(container.count('something-else')).toBe(0);
    expect(container.count('button')).toBe(2);
  });

  test('get', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(() => container.get('button')).toThrow();
    expect(() => container.get('non-existent')).toThrow();
    expect(container.get('#test').id).toBe('test');
  });

  test('find', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.find('#test')).toBeInstanceOf(HTMLElement);
    expect(container.find('something-else')).toBeNull();
    const btn = container.find('button');
    expect(btn && btn.id).toBe('btn1');
  });

  test('all', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.all('#test')).toHaveLength(1);
    expect(container.all('#test')[0].id).toBe('test');
    expect(container.all('something-else')).toEqual([]);
    expect(container.all('button')).toHaveLength(2);
    expect(container.all('button')[0].id).toBe('btn1');
    expect(container.all('button')[1].id).toBe('btn2');
  });
});
