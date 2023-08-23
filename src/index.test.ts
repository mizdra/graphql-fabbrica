import { expect, it, describe, assertType, expectTypeOf, vi } from 'vitest';
import { oneOf } from './test/util.js';
import { defineBookFactory, resetAllSequence, lazy, defineUserFactory, defineAuthorFactory } from './index.js';

describe('integration test', () => {
  it('circular dependent type', async () => {
    const BookFactory = defineBookFactory({
      defaultFields: {
        id: lazy(({ seq }) => `Book-${seq}`),
        title: lazy(({ seq }) => `ゆゆ式 ${seq}巻`),
        // NOTE: `lazy(({ seq }) => AuthorFactory.build())` causes a circular dependency between `BookFactory` and `AuthorFactory`.
        // As a result, the types of each other become undecidable and a compile error occurs.
        // So that the type is not undecidable, pass `undefined`.
        author: undefined,
      },
    });
    const AuthorFactory = defineAuthorFactory({
      defaultFields: {
        id: lazy(({ seq }) => `Author-${seq}`),
        name: lazy(({ seq }) => `${seq}上小又`),
        // NOTE: The type is not undecidable, pass `undefined`.
        books: undefined,
      },
    });
    const book = await BookFactory.build({
      author: await AuthorFactory.build(),
    });

    expect(book).toStrictEqual({
      id: 'Book-0',
      title: 'ゆゆ式 0巻',
      author: {
        id: 'Author-0',
        name: '0上小又',
        books: undefined,
      },
    });
    assertType<{
      id: string;
      title: string;
      author: {
        id: string;
        name: string;
        books: undefined;
      };
    }>(book);
    expectTypeOf(book).not.toBeNever();

    const author = await AuthorFactory.build({
      books: [book],
    });
    expect(author).toStrictEqual({
      id: 'Author-1',
      name: '1上小又',
      books: [book],
    });
    assertType<{
      id: string;
      name: string;
      books: readonly {
        id: string;
        title: string;
        author: {
          id: string;
          name: string;
          books: undefined;
        };
      }[];
    }>(author);
    expectTypeOf(author).not.toBeNever();
  });
});

describe('defineTypeFactory', () => {
  describe('defaultFields', () => {
    it('basic', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: 'Book-0',
          title: 'ゆゆ式',
          author: {
            id: 'Author-0',
            name: '三上小又',
            books: [],
          },
        },
      });
      const book = await BookFactory.build();
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式',
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: [],
        },
      });
      assertType<{
        id: string;
        title: string;
        author: {
          id: string;
          name: string;
          books: never[];
        };
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('accepts undefined fields', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: 'Book-0',
          title: undefined, // shallow field
          author: {
            id: 'Author-0',
            name: '三上小又',
            books: undefined, // deep field
          },
        },
      });
      const book = await BookFactory.build();
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: undefined,
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: undefined,
        },
      });
      assertType<{
        id: string;
        title: undefined;
        author: {
          id: string;
          name: string;
          books: undefined;
        };
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('accepts functional field resolvers', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(() => 'Book-0'),
          title: lazy(async () => Promise.resolve('ゆゆ式')),
          author: undefined,
        },
      });
      const book = await BookFactory.build();
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式',
        author: undefined,
      });
      assertType<{
        id: string;
        title: string;
        author: undefined;
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('accepts readonly array as field', async () => {
      const books = [{ id: 'Book-0', title: 'ゆゆ式', author: undefined }] as const;
      const AuthorFactory = defineAuthorFactory({
        defaultFields: {
          id: 'Author-0',
          name: '三上小又',
          books,
        },
      });
      const author = await AuthorFactory.build();
      assertType<{
        id: string;
        name: string;
        books: readonly [{ id: 'Book-0'; title: 'ゆゆ式'; author: undefined }];
      }>(author);
      expectTypeOf(author).not.toBeNever();
    });
    it('creates fields with sequential id', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Book-${seq}`),
          title: lazy(async ({ seq }) => Promise.resolve(`ゆゆ式 ${seq}巻`)),
          author: undefined,
        },
      });
      const book = await BookFactory.build();
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式 0巻',
        author: undefined,
      });
      assertType<{
        id: string;
        title: string;
        author: undefined;
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('creates fields based on the values of other fields', async () => {
      const firstNameResolver = vi.fn(() => 'Komata');
      const lastNameResolver = vi.fn(() => 'Mikami');
      const UserFactory = defineUserFactory({
        defaultFields: {
          id: lazy(({ seq }) => `User-${seq}`),
          firstName: lazy(firstNameResolver),
          lastName: lazy(lastNameResolver),
          fullName: lazy(async ({ get }) => `${await get('firstName')} ${await get('lastName')}`),
        },
      });
      const User = await UserFactory.build();
      expect(User).toStrictEqual({
        id: 'User-0',
        firstName: 'Komata',
        lastName: 'Mikami',
        fullName: 'Komata Mikami',
      });
      assertType<{
        id: string;
        firstName: string;
        lastName: string;
        fullName: string;
      }>(User);
      expectTypeOf(User).not.toBeNever();

      // The result of the field resolver is cached, so the resolver is called only once.
      expect(firstNameResolver).toHaveBeenCalledTimes(1);
      expect(lastNameResolver).toHaveBeenCalledTimes(1);
    });
  });
  describe('resetAllSequence', () => {
    it('resets all sequence', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Book-${seq}`),
          title: 'ゆゆ式',
          author: undefined,
        },
      });
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-0' });
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-1' });
      resetAllSequence();
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-0' });
      // TODO: Test other factories
    });
  });
});

describe('TypeFactoryInterface', () => {
  const BookFactory = defineBookFactory({
    defaultFields: {
      id: 'Book-0',
      title: 'ゆゆ式',
      author: {
        id: 'Author-0',
        name: '三上小又',
        books: [],
      },
    },
  });
  describe('build', () => {
    it('overrides defaultFields', async () => {
      // input field is optional
      const book1 = await oneOf([BookFactory.build(), BookFactory.build({})]);
      expect(book1).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式',
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: [],
        },
      });
      assertType<{
        id: string;
        title: string;
        author: {
          id: string;
          name: string;
          books: never[];
        };
      }>(book1);
      expectTypeOf(book1).not.toBeNever();

      // Passing input fields allows overriding the default field.
      const book2 = await BookFactory.build({
        title: 'ゆゆ式 100巻',
      });
      expect(book2).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式 100巻',
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: [],
        },
      });
      assertType<{
        id: string;
        title: string;
        author: {
          id: string;
          name: string;
          books: never[];
        };
      }>(book2);
      expectTypeOf(book2).not.toBeNever();
    });
    it('accepts undefined fields', async () => {
      const book = await BookFactory.build({
        title: undefined, // shallow field
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: undefined, // deep field
        },
      });
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: undefined,
        author: {
          id: 'Author-0',
          name: '三上小又',
          books: undefined,
        },
      });
      assertType<{
        id: string;
        title: undefined;
        author: {
          id: string;
          name: string;
          books: undefined;
        };
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('accepts functional field resolvers', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: 'Book-0',
          title: 'ゆゆ式',
          author: undefined,
        },
      });
      const book = await BookFactory.build({
        id: lazy(() => 'Book-0'),
        title: lazy(async () => Promise.resolve('ゆゆ式')),
        author: undefined,
      });
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式',
        author: undefined,
      });
      assertType<{
        id: string;
        title: string;
        author: undefined;
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('accepts readonly array as field', async () => {
      const books = [{ id: 'Book-0', title: 'ゆゆ式', author: undefined }] as const;
      const AuthorFactory = defineAuthorFactory({
        defaultFields: {
          id: 'Author-0',
          name: '三上小又',
          books: undefined,
        },
      });
      const author = await AuthorFactory.build({ books });
      assertType<{
        id: string;
        name: string;
        books: readonly [{ id: 'Book-0'; title: 'ゆゆ式'; author: undefined }];
      }>(author);
      expectTypeOf(author).not.toBeNever();
    });
    it('does not call the overridden resolvers', async () => {
      const defaultTitleResolver = vi.fn(() => 'ゆゆ式');
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: 'Book-0',
          title: lazy(defaultTitleResolver),
          author: undefined,
        },
      });
      const book = await BookFactory.build({
        title: 'ゆゆ式 100巻',
      });
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式 100巻',
        author: undefined,
      });
      assertType<{
        id: string;
        title: string;
        author: undefined;
      }>(book);
      expectTypeOf(book).not.toBeNever();
      expect(defaultTitleResolver).not.toHaveBeenCalled();
    });
    it('creates fields with sequential id', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: 'Book-0',
          title: 'ゆゆ式',
          author: undefined,
        },
      });
      const book = await BookFactory.build({
        id: lazy(({ seq }) => `Book-${seq}`),
        title: lazy(async ({ seq }) => Promise.resolve(`ゆゆ式 ${seq}巻`)),
      });
      expect(book).toStrictEqual({
        id: 'Book-0',
        title: 'ゆゆ式 0巻',
        author: undefined,
      });
      assertType<{
        id: string;
        title: string;
        author: undefined;
      }>(book);
      expectTypeOf(book).not.toBeNever();
    });
    it('creates fields based on the values of other fields', async () => {
      const firstNameResolver = vi.fn(() => 'Komata');
      const lastNameResolver = vi.fn(() => 'Mikami');
      const UserFactory = defineUserFactory({
        defaultFields: {
          id: lazy(({ seq }) => `User-${seq}`),
          firstName: '',
          lastName: '',
          fullName: '',
        },
      });
      const User = await UserFactory.build({
        firstName: lazy(firstNameResolver),
        lastName: lazy(lastNameResolver),
        fullName: lazy(async ({ get }) => `${await get('firstName')} ${await get('lastName')}`),
      });
      expect(User).toStrictEqual({
        id: 'User-0',
        firstName: 'Komata',
        lastName: 'Mikami',
        fullName: 'Komata Mikami',
      });
      assertType<{
        id: string;
        firstName: string;
        lastName: string;
        fullName: string;
      }>(User);
      expectTypeOf(User).not.toBeNever();

      // The result of the field resolver is cached, so the resolver is called only once.
      expect(firstNameResolver).toHaveBeenCalledTimes(1);
      expect(lastNameResolver).toHaveBeenCalledTimes(1);
    });
  });
  describe('resetSequence', () => {
    it('resets sequence', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Book-${seq}`),
          title: 'ゆゆ式',
          author: undefined,
        },
      });
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-0' });
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-1' });
      BookFactory.resetSequence();
      expect(await BookFactory.build()).toMatchObject({ id: 'Book-0' });
      // TODO: Test other factories
    });
  });
});
