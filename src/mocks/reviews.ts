import { Reviews } from '@/types/reviews'

export const mockReviews: Reviews = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'John Week',
      avatarUrl: 'markup/img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A nice place to stay',
    rating: 3,
  },
]
