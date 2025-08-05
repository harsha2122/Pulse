import { _mock } from 'src/_mock';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Pulse Multispecialist',
    // email: 'demo@minimals.cc',
    email: 'pulse@gmail.com',
    photoURL: _mock.image.avatar(24),
    phoneNumber: _mock.phoneNumber(1),
    country: _mock.countryNames(1),
    address:"Survey No 66/1, Lande Building, Tathawade Chowk, Aundh Ravet BRT's Road, Chinchwad-411033",
    state: 'Maharashtra',
    city: 'Pune',
    zipCode: '411033',
    about: 'We are pulse multispecialist hospital pune',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
