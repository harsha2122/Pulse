import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';

import { _testimonials } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { bgBlur, varAlpha, bgGradient, hideScrollY } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutTestimonials() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderLink = (
    <Button color="primary" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
      Read more testimonials
    </Button>
  );

  const renderDescription = (
    <Box sx={{ maxWidth: { md: 360 }, textAlign: { xs: 'center', md: 'unset' } }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="overline" sx={{ color: 'common.white', opacity: 0.48 }}>
          Our Commitment
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3, color: 'common.white' }}>
          Your Health, <br />
          Our Priority
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'common.white' }}>
          Our goal is to deliver healthcare services and patient care that exceed your expectations
          and earn your trust every single day. This is why we&apos;re continuously improving our
          medical practices, investing in cutting-edge technology, and training our staff to provide
          the highest standard of care. We genuinely value feedback from our patients and their
          loved ones, as your voice guides us in our mission to heal, comfort, and serve our
          community.
        </Typography>
      </m.div>

      {!mdUp && (
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
        >
          {renderLink}
        </Box>
      )}
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        ...hideScrollY,
        py: { md: 10 },
        height: { md: 1 },
        overflowY: { xs: 'unset', md: 'auto' },
      }}
    >
      <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {TESTIMONIALS.map((testimonial) => (
          <m.div key={testimonial.name} variants={varFade().inUp}>
            <TestimonialCard testimonial={testimonial} />
          </m.div>
        ))}
      </Masonry>
    </Box>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.9)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.9)}`,
          imgUrl: `${CONFIG.site.basePath}/assets/images/about/testimonials.webp`,
        }),
        overflow: 'hidden',
        height: { md: 840 },
        py: { xs: 10, md: 0 },
      }}
    >
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid xs={10} md={4}>
            {renderDescription}
          </Grid>

          <Grid xs={12} md={7} lg={6} alignItems="center" sx={{ height: 1 }}>
            {renderContent}
          </Grid>
        </Grid>

        {mdUp && (
          <Box
            component={m.div}
            variants={varFade().inUp}
            sx={{ bottom: 60, position: 'absolute' }}
          >
            {renderLink}
          </Box>
        )}
      </Container>
    </Box>
  );
}

function TestimonialCard({ testimonial, sx, ...other }) {
  const theme = useTheme();

  const { name, ratingNumber, postedDate, content, avatarUrl, rating } = testimonial;

  return (
    <Stack
      spacing={3}
      sx={{
        ...bgBlur({ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.08) }),
        p: 3,
        borderRadius: 2,
        color: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:quote-left-fill" width={40} sx={{ opacity: 0.48 }} />

      <Typography variant="body2">{content}</Typography>

      <Rating value={rating} readOnly size="small" />

      <Stack direction="row">
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

        <ListItemText
          primary={name}
          secondary={fDate(postedDate)}
          primaryTypographyProps={{ typography: 'subtitle2', mb: 0.5 }}
          secondaryTypographyProps={{
            color: 'inherit',
            typography: 'caption',
            sx: { opacity: 0.64 },
          }}
        />
      </Stack>
    </Stack>
  );
}
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
