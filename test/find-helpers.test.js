import createFindHelpers from '../src/find-helpers';

describe('find helpers', () => {
  let domNode, helpers;

  beforeEach(() => {
    domNode = document.createElement('div');
    document.body.appendChild(domNode);
    helpers = createFindHelpers(domNode);
  });

  afterEach(() => {
    document.body.removeChild(domNode);
  });

  describe('find', () => {
    it('returns matching node', () => {
      const btn = document.createElement('button');
      domNode.appendChild(btn);
      expect(helpers.find('button')).toBe(btn);
    });

    it('returns first of multiple matching nodes', () => {
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(helpers.find('span')).toBe(span1);
    });

    it('returns null when no match found', () => {
      expect(helpers.find('textarea')).toBeNull();
    });
  });

  describe('findAll', () => {
    it('returns matching node', () => {
      const btn = document.createElement('button');
      domNode.appendChild(btn);
      expect(helpers.findAll('button')).toEqual([btn]);
    });

    it('returns first of multiple matching nodes', () => {
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(helpers.findAll('span')).toEqual([span1, span2]);
    });

    it('returns empty array when no match found', () => {
      expect(helpers.findAll('textarea')).toEqual([]);
    });
  });

  describe('findOnly', () => {
    it('returns single matching node', () => {
      const btn = document.createElement('button');
      domNode.appendChild(btn);
      expect(helpers.findOnly('button')).toEqual(btn);
    });

    it('throws on multiple matching nodes', () => {
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(() => helpers.findOnly('span')).toThrow();
    });

    it('throws when no match found', () => {
      expect(() => helpers.findOnly('textarea')).toThrow();
    });
  });

  describe('findByText', () => {
    it('returns matching node', () => {
      const btn = document.createElement('button');
      btn.appendChild(document.createTextNode('test'));
      domNode.appendChild(btn);
      expect(helpers.findByText('test')).toBe(btn);
    });

    it('returns first of multiple matching nodes', () => {
      const span1 = document.createElement('span');
      span1.appendChild(document.createTextNode('test'));
      const span2 = document.createElement('span');
      span2.appendChild(document.createTextNode('test'));
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(helpers.findByText('test')).toBe(span1);
    });

    it('returns null when no match found', () => {
      expect(helpers.findByText('something else')).toBeNull();
    });
  });

  describe('findAllByText', () => {
    it('returns matching node', () => {
      const btn = document.createElement('button');
      btn.appendChild(document.createTextNode('test'));
      domNode.appendChild(btn);
      expect(helpers.findAllByText('test')).toEqual([btn]);
    });

    it('returns all matching nodes', () => {
      const span1 = document.createElement('span');
      span1.appendChild(document.createTextNode('test'));
      const span2 = document.createElement('span');
      span2.appendChild(document.createTextNode('test'));
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(helpers.findAllByText('test')).toEqual([span1, span2]);
    });

    it('returns empty array when no match found', () => {
      expect(helpers.findAllByText('something else')).toEqual([]);
    });
  });

  describe('findOnlyByText', () => {
    it('returns matching node', () => {
      const btn = document.createElement('button');
      btn.appendChild(document.createTextNode('test'));
      domNode.appendChild(btn);
      expect(helpers.findOnlyByText('test')).toBe(btn);
    });

    it('throws on multiple matching nodes', () => {
      const span1 = document.createElement('span');
      span1.appendChild(document.createTextNode('test'));
      const span2 = document.createElement('span');
      span2.appendChild(document.createTextNode('test'));
      domNode.appendChild(span1);
      domNode.appendChild(span2);
      expect(() => helpers.findOnlyByText('test')).toThrow();
    });

    it('throws when no match found', () => {
      expect(() => helpers.findOnlyByText('something else')).toThrow();
    });
  });
});
