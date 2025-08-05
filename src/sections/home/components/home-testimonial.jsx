import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { _mock } from 'src/_mock';
import { maxLine, varAlpha, textGradient } from 'src/theme/styles';

import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './section-title';
import { FloatLine, FloatTriangleDownIcon } from './svg-elements';

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }) {
  const theme = useTheme();

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static' }} />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  const renderDescription = (
    <SectionTitle
      caption="Reviews"
      title="What Our Patients Say"
      txtGradient="about us"
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const horizontalDivider = (position) => (
    <Divider
      component="div"
      sx={{
        width: 1,
        opacity: 0.16,
        height: '1px',
        border: 'none',
        position: 'absolute',
        background: `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        ...(position === 'top' && { top: 0 }),
        ...(position === 'bottom' && { bottom: 0 }),
      }}
    />
  );

  const verticalDivider = (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={{
        opacity: 0.16,
        border: 'none',
        width: '1px',
        background: `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        display: { xs: 'none', md: 'block' },
      }}
    />
  );

  const renderContent = (
    <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      {horizontalDivider('top')}

      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <Stack key={item.id} component={m.div} variants={varFade().in}>
            <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
              <Rating size="small" name="read-only" value={item.rating} precision={0.5} readOnly />
              {item.content}
            </Stack>

            <Typography
              sx={{ ...maxLine({ line: 4, persistent: theme.typography.body1 }), mt: 2, mb: 3 }}
            >
              {item.category}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={-5}>
              <Stack sx={{ typography: 'subtitle1' }}>
                <Box component="span">{item.name}</Box>
                <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                  {fToNow(new Date(item.postedAt))}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Carousel>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: { xs: 5, md: 8 } }}
      >
        <CarouselDotButtons
          fallback
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Stack>
    </Stack>
  );

  const renderNumber = (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      {horizontalDivider('top')}

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={verticalDivider}>
        {[
          { label: 'Recovered Patients', value: 1200 },
          { label: 'Expert Doctors', value: 10 },
          { label: 'Satisfaction rate', value: 90 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                unit={
                  item.label === 'Recovered Patients' || item.label === 'Expert Doctors' ? '+' : '%'
                }
                toFixed={
                  item.label === 'Recovered Patients' || item.label === 'Expert Doctors' ? 0 : 1
                }
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="span"
                sx={{
                  ...textGradient(
                    `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                  ),
                  opacity: 0.4,
                  typography: 'h6',
                }}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {horizontalDivider('bottom')}
    </Stack>
  );

  return (
    <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          {renderDescription}

          {renderContent}

          {renderNumber}
        </Container>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const base = (index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});
const TESTIMONIALS = [
  {
    id: 9,
    name: 'Aarti Kulkarni',
    avatarUrl: '/avatars/avatar_9.jpg',
    category: 'Dermatology',
    content:
      'Skin allergy ke liye gayi thi, doctor explained allergy reasons and gave proper cream. Reception thoda slow tha but overall satisfied.',
    rating: 5,
    postedAt: 'May 24, 2024 16:40:00',
  },
  {
    id: 10,
    name: 'Nikhil Bhosale',
    avatarUrl: '/avatars/avatar_10.jpg',
    category: 'ENT',
    content:
      'Ear pain tha kaafi din se. ENT specialist ne simple cleaning se relief diya. No unnecessary tests. Good honest staff.',
    rating: 4.7,
    postedAt: 'June 01, 2024 11:55:00',
  },
  {
    id: 11,
    name: 'Reshma Gaikwad',
    avatarUrl: '/avatars/avatar_11.jpg',
    category: 'Pediatrics',
    content:
      'My son had high fever. Pediatric dept is clean and colorful. Doctor was polite and medicines worked fast.',
    rating: 5,
    postedAt: 'June 06, 2024 14:10:00',
  },
  {
    id: 12,
    name: 'Vikram Naik',
    avatarUrl: '/avatars/avatar_12.jpg',
    category: 'Dental',
    content:
      'Tooth extraction was done smoothly. Doctor used laser tool which made it painless. Appointment wait time is there but worth it.',
    rating: 4.5,
    postedAt: 'June 13, 2024 18:25:00',
  },
  {
    id: 13,
    name: 'Shital Rane',
    avatarUrl: '/avatars/avatar_13.jpg',
    category: 'Physiotherapy',
    content:
      'Post-surgery physio helped me walk again in 4 weeks. Therapist was very motivating. Water cooler was not working though.',
    rating: 5,
    postedAt: 'June 19, 2024 08:35:00',
  },
  {
    id: 14,
    name: 'Harshal Dhole',
    avatarUrl: '/avatars/avatar_14.jpg',
    category: 'Nephrology',
    content:
      "My uncle's dialysis sessions handled professionally. Nurses are attentive. Billing system can be faster.",
    rating: 4.7,
    postedAt: 'June 25, 2024 21:00:00',
  },
  {
    id: 15,
    name: 'Pooja Gokhale',
    avatarUrl: '/avatars/avatar_15.jpg',
    category: 'Radiology',
    content:
      'Went for MRI scan. Very clean lab and no delay. Staff explained calmly and helped reduce fear.',
    rating: 4.6,
    postedAt: 'July 01, 2024 12:50:00',
  },
  {
    id: 16,
    name: 'Sagar Phadke',
    avatarUrl: '/avatars/avatar_16.jpg',
    category: 'Urology',
    content:
      'Doctor was very clear and gave 2nd opinion which saved surgery. Appreciate honest feedback.',
    rating: 4.8,
    postedAt: 'July 05, 2024 15:05:00',
  },
  {
    id: 17,
    name: 'Neha Wagh',
    avatarUrl: '/avatars/avatar_17.jpg',
    category: 'Gastroenterology',
    content:
      'Consulted for acidity and digestion issues. Doctor prescribed lifestyle changes, no heavy meds. Good experience.',
    rating: 4.4,
    postedAt: 'July 11, 2024 09:15:00',
  },
  {
    id: 18,
    name: 'Rohan Jagtap',
    avatarUrl: '/avatars/avatar_18.jpg',
    category: 'Psychiatry',
    content:
      'Initially hesitant but counselor made me feel comfortable. Good follow-up system and peaceful setup.',
    rating: 4.9,
    postedAt: 'July 15, 2024 19:45:00',
  },
];



