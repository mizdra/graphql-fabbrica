import { expect, it, describe, assertType, expectTypeOf, vi } from 'vitest';
import {
  DefaultFieldsResolver,
  Traits,
  TypeFactoryDefineOptions,
  TypeFactoryInterface,
  defineTypeFactoryInternal,
  lazy,
  resetAllSequence,
} from './__generated__/fabbrica.js';
import { oneOf } from './test/util.js';

export type Book = {
  id: string;
  title: string;
  author: Author;
};
export type Author = {
  id: string;
  name: string;
  books: Book[];
};
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
};
export type Image = {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
};
const BookFieldNames = ['id', 'title', 'author'] as const;
const AuthorFieldNames = ['id', 'name', 'books'] as const;
const UserFieldNames = ['id', 'firstName', 'lastName', 'fullName'] as const;
const ImageFieldNames = ['id', 'url', 'width', 'height'] as const;

export type BookFactoryDefineOptions<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Book & TransientFields>,
  _Traits extends Traits<Book, TransientFields>,
> = TypeFactoryDefineOptions<Book, TransientFields, _DefaultFieldsResolver, _Traits>;
export type BookFactoryInterface<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Book & TransientFields>,
  _Traits extends Traits<Book, TransientFields>,
> = TypeFactoryInterface<Book, TransientFields, _DefaultFieldsResolver, _Traits>;

export function defineBookFactoryInternal<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Book & TransientFields>,
  _Traits extends Traits<Book, TransientFields>,
>(
  options: BookFactoryDefineOptions<TransientFields, _DefaultFieldsResolver, _Traits>,
): BookFactoryInterface<TransientFields, _DefaultFieldsResolver, _Traits> {
  return defineTypeFactoryInternal(BookFieldNames, options);
}

/**
 * Define factory for {@link Book} model.
 *
 * @param options
 * @returns factory {@link BookFactoryInterface}
 */
export function defineBookFactory<
  _DefaultFieldsResolver extends DefaultFieldsResolver<Book>,
  _Traits extends Traits<Book, {}>,
>(
  options: BookFactoryDefineOptions<{}, _DefaultFieldsResolver, _Traits>,
): BookFactoryInterface<{}, _DefaultFieldsResolver, _Traits> {
  return defineBookFactoryInternal(options);
}

// ---------- Author ----------

export type AuthorFactoryDefineOptions<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Author & TransientFields>,
  _Traits extends Traits<Author, TransientFields>,
> = TypeFactoryDefineOptions<Author, TransientFields, _DefaultFieldsResolver, _Traits>;
export type AuthorFactoryInterface<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Author & TransientFields>,
  _Traits extends Traits<Author, TransientFields>,
> = TypeFactoryInterface<Author, TransientFields, _DefaultFieldsResolver, _Traits>;

export function defineAuthorFactoryInternal<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Author & TransientFields>,
  _Traits extends Traits<Author, TransientFields>,
>(
  options: AuthorFactoryDefineOptions<TransientFields, _DefaultFieldsResolver, _Traits>,
): AuthorFactoryInterface<TransientFields, _DefaultFieldsResolver, _Traits> {
  return defineTypeFactoryInternal(AuthorFieldNames, options);
}

/**
 * Define factory for {@link Author} model.
 *
 * @param options
 * @returns factory {@link AuthorFactoryInterface}
 */
export function defineAuthorFactory<
  _DefaultFieldsResolver extends DefaultFieldsResolver<Author>,
  _Traits extends Traits<Author, {}>,
>(
  options: AuthorFactoryDefineOptions<{}, _DefaultFieldsResolver, _Traits>,
): AuthorFactoryInterface<{}, _DefaultFieldsResolver, _Traits> {
  return defineAuthorFactoryInternal(options);
}

// ---------- User ----------

export type UserFactoryDefineOptions<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<User & TransientFields>,
  _Traits extends Traits<User, TransientFields>,
> = TypeFactoryDefineOptions<User, TransientFields, _DefaultFieldsResolver, _Traits>;
export type UserFactoryInterface<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<User & TransientFields>,
  _Traits extends Traits<User, TransientFields>,
> = TypeFactoryInterface<User, TransientFields, _DefaultFieldsResolver, _Traits>;

export function defineUserFactoryInternal<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<User & TransientFields>,
  _Traits extends Traits<User, TransientFields>,
>(
  options: UserFactoryDefineOptions<TransientFields, _DefaultFieldsResolver, _Traits>,
): UserFactoryInterface<TransientFields, _DefaultFieldsResolver, _Traits> {
  return defineTypeFactoryInternal(UserFieldNames, options);
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<
  _DefaultFieldsResolver extends DefaultFieldsResolver<User>,
  _Traits extends Traits<User, {}>,
>(
  options: UserFactoryDefineOptions<{}, _DefaultFieldsResolver, _Traits>,
): UserFactoryInterface<{}, _DefaultFieldsResolver, _Traits> {
  return defineUserFactoryInternal(options);
}

// ---------- Image ----------

export type ImageFactoryDefineOptions<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Image & TransientFields>,
  _Traits extends Traits<Image, TransientFields>,
> = TypeFactoryDefineOptions<Image, TransientFields, _DefaultFieldsResolver, _Traits>;
export type ImageFactoryInterface<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Image & TransientFields>,
  _Traits extends Traits<Image, TransientFields>,
> = TypeFactoryInterface<Image, TransientFields, _DefaultFieldsResolver, _Traits>;

export function defineImageFactoryInternal<
  TransientFields extends Record<string, unknown>,
  _DefaultFieldsResolver extends DefaultFieldsResolver<Image & TransientFields>,
  _Traits extends Traits<Image, TransientFields>,
>(
  options: ImageFactoryDefineOptions<TransientFields, _DefaultFieldsResolver, _Traits>,
): ImageFactoryInterface<TransientFields, _DefaultFieldsResolver, _Traits> {
  return defineTypeFactoryInternal(ImageFieldNames, options);
}

/**
 * Define factory for {@link Image} model.
 *
 * @param options
 * @returns factory {@link ImageFactoryInterface}
 */
export function defineImageFactory<
  _DefaultFieldsResolver extends DefaultFieldsResolver<Image>,
  _Traits extends Traits<Image, {}>,
>(
  options: ImageFactoryDefineOptions<{}, _DefaultFieldsResolver, _Traits>,
): ImageFactoryInterface<{}, _DefaultFieldsResolver, _Traits> {
  return defineImageFactoryInternal(options);
}

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
          fullName: lazy(
            async ({ get }) => `${(await get('firstName')) ?? 'firstName'} ${(await get('lastName')) ?? 'lastName'}`,
          ),
        },
      });
      const user = await UserFactory.build();
      expect(user).toStrictEqual({
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
      }>(user);
      expectTypeOf(user).not.toBeNever();

      // The result of the field resolver is cached, so the resolver is called only once.
      expect(firstNameResolver).toHaveBeenCalledTimes(1);
      expect(lastNameResolver).toHaveBeenCalledTimes(1);
    });
  });
  describe('traits', () => {
    it('overrides defaultFields', async () => {
      const ImageFactory = defineImageFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Image-${seq}`),
          url: '#',
          width: null,
          height: null,
        },
        traits: {
          avatar: {
            defaultFields: {
              url: 'https://example.com/avatar.png',
              width: 48,
              height: 48,
            },
          },
        },
      });
      const image = await ImageFactory.use('avatar').build();
      expect(image).toStrictEqual({
        id: 'Image-0',
        url: 'https://example.com/avatar.png',
        width: 48,
        height: 48,
      });
      assertType<{
        id: string;
        url: string;
        width: number;
        height: number;
      }>(image);
      expectTypeOf(image).not.toBeNever();
    });
    it('overrides fields multiple times by chaining the use methods', async () => {
      const ImageFactory = defineImageFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Image-${seq}`),
          url: '#',
          width: null,
          height: null,
        },
        traits: {
          large: {
            defaultFields: {
              width: 256,
              height: 256,
            },
          },
          avatar: {
            defaultFields: {
              url: 'https://example.com/avatar.png',
            },
          },
        },
      });
      const image = await ImageFactory.use('large').use('avatar').build();
      expect(image).toStrictEqual({
        id: 'Image-0',
        url: 'https://example.com/avatar.png',
        width: 256,
        height: 256,
      });
      assertType<{
        id: string;
        url: string;
        width: number;
        height: number;
      }>(image);
      expectTypeOf(image).not.toBeNever();
    });
  });
  describe('transientFields', () => {
    it('basic', async () => {
      // Define factory with transient fields
      type AuthorTransientFields = {
        bookCount: number;
      };
      function defineAuthorFactoryWithTransientFields<
        _DefaultFieldsResolver extends DefaultFieldsResolver<Author & AuthorTransientFields>,
        _Traits extends Traits<Author, AuthorTransientFields>,
      >(
        options: AuthorFactoryDefineOptions<AuthorTransientFields, _DefaultFieldsResolver, _Traits>,
      ): AuthorFactoryInterface<AuthorTransientFields, _DefaultFieldsResolver, _Traits> {
        return defineAuthorFactory(options);
      }

      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Book-${seq}`),
          title: lazy(({ seq }) => `ゆゆ式 ${seq}巻`),
          author: undefined,
        },
      });
      const AuthorFactory = defineAuthorFactoryWithTransientFields({
        defaultFields: {
          id: lazy(({ seq }) => `Author-${seq}`),
          name: '三上小又',
          books: lazy(async ({ get }) => {
            const bookCount = (await get('bookCount')) ?? 0;
            // eslint-disable-next-line max-nested-callbacks
            return Promise.all(Array.from({ length: bookCount }, async () => BookFactory.build()));
          }),
          bookCount: 0,
        },
      });
      const author1 = await AuthorFactory.build();
      expect(author1).toStrictEqual({
        id: 'Author-0',
        name: '三上小又',
        books: [],
      });
      assertType<{
        id: string;
        name: string;
        books: { id: string; title: string; author: undefined }[];
      }>(author1);
      expectTypeOf(author1).not.toBeNever();

      const author2 = await AuthorFactory.build({ bookCount: 3 });
      expect(author2).toStrictEqual({
        id: 'Author-1',
        name: '三上小又',
        books: [
          { id: 'Book-0', title: 'ゆゆ式 0巻', author: undefined },
          { id: 'Book-1', title: 'ゆゆ式 1巻', author: undefined },
          { id: 'Book-2', title: 'ゆゆ式 2巻', author: undefined },
        ],
      });
      assertType<{
        id: string;
        name: string;
        books: {
          id: string;
          title: string;
          author: undefined;
        }[];
      }>(author2);
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
    it('returns the object with mutable fields', async () => {
      const AuthorFactory = defineAuthorFactory({
        defaultFields: {
          id: 'Author-0',
          name: '0上小又',
          books: [{ id: 'Book-0', title: 'ゆゆ式 0巻', author: undefined }],
        },
      });

      // field is mutable
      const author1 = await AuthorFactory.build();
      author1.id = 'Author-1';
      author1.name = '1上小又';
      author1.books = [{ id: 'Book-1', title: 'ゆゆ式 1巻', author: undefined }];
      assertType<{
        id: string;
        name: string;
        books: { id: string; title: string; author: undefined }[];
      }>(author1);
      expectTypeOf(author1).not.toBeNever();

      // The readonly modifier of the input value is kept.
      const books = [{ id: 'Book-1', title: 'ゆゆ式 1巻', author: undefined }] as const;
      const author2 = await AuthorFactory.build({ books });
      author2.id = 'Author-1';
      author2.name = '1上小又';
      // @ts-expect-error -- ignore readonly error
      author2.books = [{ id: 'Book-2', title: 'ゆゆ式 2巻', author: undefined }];
      assertType<{
        id: string;
        name: string;
        books: readonly [{ id: 'Book-1'; title: 'ゆゆ式 1巻'; author: undefined }];
      }>(author2);
      expectTypeOf(author2).not.toBeNever();
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
        fullName: lazy(
          async ({ get }) => `${(await get('firstName')) ?? 'firstName'} ${(await get('lastName')) ?? 'lastName'}`,
        ),
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
  describe('buildList', () => {
    it('overrides defaultFields', async () => {
      const BookFactory = defineBookFactory({
        defaultFields: {
          id: lazy(({ seq }) => `Book-${seq}`),
          title: 'ゆゆ式',
          author: undefined,
        },
      });
      // input field is optional
      const books1 = await BookFactory.buildList(2);
      expect(books1).toStrictEqual([
        {
          id: 'Book-0',
          title: 'ゆゆ式',
          author: undefined,
        },
        {
          id: 'Book-1',
          title: 'ゆゆ式',
          author: undefined,
        },
      ]);
      assertType<
        {
          id: string;
          title: string;
          author: undefined;
        }[]
      >(books1);
      expectTypeOf(books1).not.toBeNever();

      BookFactory.resetSequence();

      // Passing input fields allows overriding the default field.
      const book2 = await BookFactory.buildList(2, {
        title: 'ゆゆ式 100巻',
      });
      expect(book2).toStrictEqual([
        {
          id: 'Book-0',
          title: 'ゆゆ式 100巻',
          author: undefined,
        },
        {
          id: 'Book-1',
          title: 'ゆゆ式 100巻',
          author: undefined,
        },
      ]);
      assertType<
        {
          id: string;
          title: string;
          author: undefined;
        }[]
      >(book2);
      expectTypeOf(book2).not.toBeNever();
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