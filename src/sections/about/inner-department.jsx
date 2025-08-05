import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { _socials, _carouselsMembers } from 'src/_mock';

import { Image } from 'src/components/image';
import { SocialIcon } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------
const departments = [
  {
    title: 'Bariatric Surgery',
    image:
      'https://imgs.search.brave.com/xVFvQgdVZvC_CoqZLKEfg9Od8djtUEtX3lCpYLjrPiA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdiL0FkanVzdGFi/bGVfR2FzdHJpY19C/YW5kLnBuZw',
  },
  {
    title: 'Cardiology',
    image:
      'https://imgs.search.brave.com/abCBRT8bIj9Ri-OnXaF5m-VSvwRl5aFFCaI13r_dw6Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJk/aW9sb2d5LW9yZ2Fu/LWRvbmF0aW9uLXBv/d2VyZnVsLXZpc3Vh/bC1kYXktY3JpdGlj/YWwtcm9sZS10cmFu/c3BsYW50cy1oZWFy/dC1kaXNlYXNlcy1z/YXZpbmctbGl2ZXMt/Z2VuZXJvdXMtMzI4/NzM4MDkwLmpwZw',
  },
  {
    title: 'Dermatology',
    image:
      'https://imgs.search.brave.com/dg2j9JrQGcEXYWQwKq3WMmddoDde6NaCs4vkVwwqPaA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kZXJt/YXRvbG9neXBjLmNv/bS93cC1jb250ZW50/L3RoZW1lcy9kZXJt/YXRvbG9neXBjL2lt/YWdlcy9tZWRpY2Fs/LWRlcm1hdG9sb2d5/LmpwZw',
  },
  {
    title: 'Gastroenterology',
    image:
      'https://imgs.search.brave.com/KUuiI53zXZHH9GEH7NT_rhCfELiyEOWUfSmzirVqedo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MTU5NjY3MC9waG90/by9nYXN0cm9lbnRl/cm9sb2d5LWdhc3Ry/b2VudGVyb2xvZ2lz/dC1jb25zdWx0YXRp/b24tdHJlYXRtZW50/LW9mLXN0b21hY2gt/ZGlzZWFzZXMtYW5k/LXVsY2Vycy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9cS0z/cV9sZjlSeER6T3ZN/MVR1Z1hnbHZCVDR6/SFJzSjlNaEJTbV9x/YjNHWT0',
  },
  {
    title: 'Haematology & BMT',
    image:
      'https://imgs.search.brave.com/EMSWXSsZch1E2EO8ab_BIcGgciLlIyeXLn5mGNUBLwI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/NTA2NzQ4Ny9waG90/by9jbG90LW9mLWJs/b29kLWNlbGxzLTNk/LXJlbmRlcmluZy1j/aGFvdGljLWJsb29k/LWNlbGxzLW9uLWJh/Y2tncm91bmQtb2Yt/dmVpbnMtY29uY2Vw/dC1vZi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9MlEydnBO/YVBxQ25KU1g4R09K/NUpEY01mdk5Bengw/eVp1cVBEZHM3ZE5Q/QT0',
  },
  {
    title: 'Interventional Radiology',
    image:
      'https://imgs.search.brave.com/-tCtHgDGELsgLG2prmkUZzFhwnxNcLoeHDJIgnY0sfE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzA2Lzg4LzY0/LzM2MF9GXzkwNjg4/NjQ4NF9ZSUk1czlI/Y3FOMFh0TWZtMTdn/R1dodVhhdVFZZnFp/eS5qcGc',
  },
  {
    title: 'Neurology',
    image:
      'https://imgs.search.brave.com/-6dquIykiTDPr2B-ZBa9B52_2pwlj5wiRZhvjg2WA-Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dWNsYWhlYWx0aC5v/cmcvc2l0ZXMvZGVm/YXVsdC9maWxlcy9z/dHlsZXMvbGFuZHNj/YXBlXzN4Ml8wMTYw/MDBfNjQweDQyN19t/b2JpbGVfaGVyby9w/dWJsaWMvYmFubmVy/LWltYWdlcy8wNS1O/ZXVyb2xvZ3ktYnJh/aW4tZXh0ZW5kZWQt/YmcuanBnP2g9NTFi/YjU3ZDkmaXRvaz05/R3ZmWHRTdQ',
  },
  {
    title: 'Obs & Gynaecology',
    image:
      'https://imgs.search.brave.com/wkAY1G9Codgc8Bc7acztDXH7wWstRSgMDw1r-z_hjmg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE0/NDk5NDMxMy9waG90/by9zdXJnZW9uLWlu/LXNjcnVicy1kaXNj/dXNzaW5nLWNvbW1v/bi1wYXRob2xvZ2ll/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dVFUMGZGcWN2/bDVYYXp4Z1p3Uk1H/N21EbGs2MWxPMnNE/UWhBSjVfa281VT0',
  },
  {
    title: 'Organ Transplant',
    image:
      'https://imgs.search.brave.com/EoyNOzCWq3jtwyFqbqEwB_pBKoJ1kEi0FvYKEqiR0qA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM0/MzI0Mjg2L3ZlY3Rv/ci9odW1hbi1vcmdh/bi1mb3ItdHJhbnNw/bGFudGF0aW9uLWRl/c2lnbi1mbGF0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/V09jSVQ1Z1N0ZGRy/aE03ckk4NTdkNTJX/NDlKX0cxOTdDN2Q3/b201SVJBPQ',
  },
  {
    title: 'Pain Clinic',
    image:
      'https://imgs.search.brave.com/pDJXIf1_WjnISi4FS4d0YOTb4pqdIp7-PYNB-T0C0Ys/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0LzI2LzYxLzI1/LzM2MF9GXzE0MjY2/MTI1MDVfN1V2ZU5s/WWY5WXNMczk3cXQ2/ajVacHhOUG95SHk0/aDkuanBn',
  },
  {
    title: 'Breast Care Center',
    image:
      'https://imgs.search.brave.com/pSsJyMA0p7uQtFH6LgBF7Gl7o-bAcexbjrFkbVqSVWk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NDYxMzY4My9waG90/by9sb3ZlLWhlYWx0/aC1jYXJlLWRvbmF0/aW9uLWFuZC1jaGFy/aXR5LWNvbmNlcHQt/YnJlYXN0LWNhbmNl/ci1hd2FyZW5lc3Mt/d29ybGQtY2FuY2Vy/LXN1cnZpdm9yLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1E/Q1ZqaUxXNGpEV1lz/VDVDSUZUZHRzTmxi/RTVSZ19uUkVadjVK/VVJ1MnljPQ',
  },
  {
    title: 'Chest Medicine',
    image:
      'https://imgs.search.brave.com/GhhPjyXPnlaHyExfUFbnqSUc-stWx2n9J5rP4F7UUyU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/NjgxNTY3NC9waG90/by9hc2lhbi1tYW4t/c3VmZmVyaW5nLWZy/b20tbGVmdC1zaWRl/ZC1jaGVzdC1wYWlu/LWNoZXN0LXBhaW4t/Y2FuLWJlLWNhdXNl/ZC1ieS1oZWFydC1h/dHRhY2sud2VicD9h/PTEmYj0xJnM9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTF2cU1va2J5/dkxMSll0UUhrQVhr/RGlRN3hyenVSa1Jk/MWlBMEtPOUZNOE05',
  },
  {
    title: 'ENT',
    image:
      'https://imgs.search.brave.com/Ef6pKPG6K9dEPdS2EMQEtHNudYzazFxmN1_74XHsyxw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzI4LzA5LzQx/LzM2MF9GXzIyODA5/NDE3N19rY2RyN0E3/Skw1MjdVT2VRQlNS/SE5zazhUQ0dVeDF0/WS5qcGc',
  },
  {
    title: 'General Surgery & Minimal Access',
    image:
      'https://imgs.search.brave.com/cPIpFKrZ9U3-hHYY6LZUcrvAcSSXoFqyEF1x7V-Vbrs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bGFrZWN1bWJlcmxh/bmRob3NwaXRhbC5j/b20vaW1hZ2VzL2Fo/bGFrZWN1bWJlcmxh/bmRyZWdpb25hbGhv/c3BpdGFsbGlicmFy/aWVzL2RlZmF1bHQt/YWxidW0vc3VyZ2Vy/eV8wLnBuZz8vaW1h/Z2VzL2FobGFrZWN1/bWJlcmxhbmRyZWdp/b25hbGhvc3BpdGFs/bGlicmFyaWVzL2Rl/ZmF1bHQtYWxidW0v/c3VyZ2VyeV8wLnBu/Zw',
  },
  {
    title: 'Infectious Diseases',
    image:
      'https://imgs.search.brave.com/vNolxKaQ19uS-tzmvsBbnvXtMDmPCd3Rt2LBbYR4dBk/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jY2No/ZC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDQvbW9z/dC1jb21tdW5pY2Fi/bGUtZGlzZWFzZXMt/aW4taW5kaWEtMzAw/eDEyOS5qcGc',
  },
  {
    title: 'Mental Health',
    image:
      'https://imgs.search.brave.com/ln8BTYcC9-vf3KmEw7NrSAnDPcAKRcrwZxhPId1yGnc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi93b3Js/ZC1oZWFydC1tZW50/YWwtaGVhbHRoLWRh/eS1wYXBlci1jdXQt/YXMtaHVtYW4taGVh/ZC1sZWFmLXRyZWUt/Y29sb3JmdWwtc2hh/cGUtZmxvd2VyLWlu/c2lkZS1icmFpbi1w/c3ljaG9sb2d5LTIx/MzE2MDkzNi5qcGc',
  },
  {
    title: 'Neurosurgery',
    image:
      'https://imgs.search.brave.com/9C7u0xb9izhozCacglbkOa3Dn3ZCoRibILXkq_edReM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbm5vdmF0aXZl/LW5ldXJvc3VyZ2Vy/eS10ZWFtLXN1cmdl/b25zLXBlcmZvcm1z/LWNvbXBsZXgtYnJh/aW4tc3VyZ2VyeS1p/bGx1bWluYXRlZC1i/eS1hZHZhbmNlZC1t/ZWRpY2FsLWltYWdp/bmctdGVjaG5vbG9n/eV82MDcyMDItMTgw/NDIuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA',
  },
  {
    title: 'Oncology',
    image:
      'https://imgs.search.brave.com/n8ikLWd1USK_UdA6FJDCKUfq8GH5JnSabx4ZtsN3-Qk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/MTQ0Njc4OS9waG90/by9jYW5jZXItY2Vs/bC1vbmNvbG9neS1j/b25jZXB0LWltbXVu/b3RoZXJhcHktdHJl/YXRtZW50LXdpdGgt/Z2VuZS1lZGl0aW5n/LXQtY2VsbHMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUdU/RjZGS3dQT3Q3ZFpZ/Qmdhclc2SVFKV0pX/QjhyVXNoeldMRG43/d3J2N3c9',
  },
  {
    title: 'Orthopaedics',
    image:
      'https://imgs.search.brave.com/8n9uJ1V3FAPbv5aryfYMzbaVMirOJciOeLJ1jo6jL7g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzM2LzMxLzA5/LzM2MF9GXzUzNjMx/MDkyNl95M25McmRv/bTdzQmlWU0tQTDdP/U2VmSUdFaldiVFBw/eC5qcGc',
  },
  {
    title: 'Plastic & Cosmetic Surgery',
    image:
      'https://imgs.search.brave.com/hKNIKfbV3-6sRj5WAk_PyWrgjkrvPhXiHADD6IRozRY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ib3Rv/eC1oYW5kcy13b21l/bi1zdHVkaW8tZmFj/ZS1saW5lLXBsYXN0/aWMtc3VyZ2VyeS13/aGl0ZS1iYWNrZ3Jv/dW5kLWJlYXV0eS1j/b3NtZXRpYy1tZWRp/Y2FsLXRyZWF0bWVu/dC1zZWxmY2FyZS0z/MTc3MzAwMTguanBn',
  },
  {
    title: 'Cardiac Surgery',
    image:
      'https://imgs.search.brave.com/H9054T1-EFdZpSOFOnJrcpjT4tU_DX5GeZjX5JGxyro/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzI3LzM3/LzM2MF9GXzIxNzI3/Mzc0MF82N2dBVldX/Q1c1cHBCeXZXVGRv/am9OOVJpa3FaaDFQ/ZC5qcGc',
  },
  {
    title: 'Dental Care',
    image:
      'https://imgs.search.brave.com/nTEUpjIbyckta7ozm0Rc-1uEUfXGtNHiWcY8TpjHdME/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjIv/ODE0LzE1NS9zbWFs/bC93aGl0ZS1oZWFs/dGh5LXRvb3RoLWRp/ZmZlcmVudC10b29s/cy1mb3ItZGVudGFs/LWNhcmUtYmx1ZS1i/YWNrZ3JvdW5kLWdl/bmVyYXRpdmUtYWkt/cGhvdG8uanBn',
  },
  {
    title: 'Endocrinology & Diabetes',
    image:
      'https://imgs.search.brave.com/rtIYogJiSvRe9hPi-DOMGlKkYQ0_Z3SoAYZvOsfN-Cc/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93ZWls/bGNvcm5lbGwub3Jn/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvY2xp/bmljYWxfc2Vydmlj/ZV9pbWFnZXMvY19l/bmRvY3Jpbm9sb2d5/X2FuZF9kaWFiZXRl/cy5qcGc',
  },
  {
    title: 'HPB & Surgical Gastroenterology',
    image:
      'https://imgs.search.brave.com/FCAd05m5ojb2IGdD1nw37WCxnGoD0eDuSixHrZJ0Lw0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YXBvbGxpbmVoZWFs/dGhjYXJlLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/MS9zdXJnaWNhbC1n/YXN0cm9lbnRlcm9s/b2d5LmpwZw',
  },
  {
    title: 'Internal Medicine',
    image:
      'https://imgs.search.brave.com/f9L-pUa9fS1cPsw7QPdUuDRsWY1hJeduMAwsAz1ou8s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kb2N0/b3ItaG9sZHMtaW50/ZXJuYWwtbWVkaWNp/bmUtYm9vay1ob3Nw/aXRhbC1kb2N0b3It/aG9sZHMtaW50ZXJu/YWwtbWVkaWNpbmUt/Ym9vay1ob3NwaXRh/bC1jb25jZXB0dWFs/LWltYWdlLTEwMzkz/MzcwNS5qcGc',
  },
  {
    title: 'Nephrology',
    image:
      'https://imgs.search.brave.com/t1fGURjl_vNmK86R_oUyJOUtwiZRMcPnSI-OA62XsjY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWNsYWhlYWx0aC5v/cmcvc2l0ZXMvZGVm/YXVsdC9maWxlcy9z/dHlsZXMvbGFuZHNj/YXBlXzN4Ml8wMTYw/MDBfNjQweDQyN19t/b2JpbGVfaGVyby9w/dWJsaWMvYmFubmVy/LWltYWdlcy8wYy9O/ZXBocm9sb2d5LUJh/bm5lci5qcGc_aD1j/YmRkM2M3YiZmPTJl/MmQ3YWJiJml0b2s9/cjBydC0zdzM',
  },
  {
    title: 'Nutrition & Dietetics',
    image:
      'https://imgs.search.brave.com/hwfciKalelk0Qb-AMPdJGHgm6iAZJR2-2FtJ0nhmgz8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vbmVuZXR1cy9u/ZW5ldHVzMjAwNS9u/ZW5ldHVzMjAwNTAw/MTMxLzE0ODI5Nzky/Mi1jbG9zZS11cC1v/Zi13b21hbi1udXRy/aXRpb25pc3QtZG9j/dG9yLXdyaXRlcy10/aGUtbWVkaWNhbC1w/cmVzY3JpcHRpb24t/Zm9yLWEtY29ycmVj/dC1kaWV0LW9uLWEt/ZGVzay5qcGc_dmVy/PTY',
  },
  {
    title: 'Ophthalmology',
    image:
      'https://imgs.search.brave.com/WY_5gfEUQnj3Ua5xctUjU5zjQEj_5l-BQNLQ5uSi_t0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9vcGh0/aGFsbW9sb2d5LW9j/dWx1cy1zYW1wbGUt/Y2xvc2V1cC1vcGh0/aGFsbW9sb2d5LW9j/dWx1cy1zYW1wbGUt/Y2xvc2V1cC1vcGh0/aGFsbW9sb2d5LWV5/ZS1tb2RlbC1jbG9z/ZS11cC1vcGh0aGFs/bW9sb2dpc3QtMTA3/Njk1NTcwLmpwZw',
  },
  {
    title: 'Paediatrics',
    image:
      'https://imgs.search.brave.com/WHj-2i01UygSowe2ezSAQF7Y_2zNZJMDsmASV8Sn2nM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/b3RhbmRwLmNvbS9o/cy1mcy9odWJmcy9w/YWVkaWF0cmljcy9p/bWctcGFlZGlhdHJp/Y3MtYXQtb3RucC1o/b25nLWtvbmctMS5w/bmc_d2lkdGg9ODU1/JmhlaWdodD03NTAm/bmFtZT1pbWctcGFl/ZGlhdHJpY3MtYXQt/b3RucC1ob25nLWtv/bmctMS5wbmc',
  },
  {
    title: 'Rheumatology',
    image:
      'https://imgs.search.brave.com/ZsSXeAV29TgpQb5zHHc439f0bZk6QBLm9RduJhXTRBE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjk3/NTcxODQ1L3Bob3Rv/L3JoZXVtYXRvbG9n/eS1jb25zdWx0YXRp/b24td29tYW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUNJ/cjIxX1VaakpWd3dO/ekVFYnVyYWxxb2Fu/SGtkSGdwUzFhdFo5/bUxoSVU9',
  },
  {
    title: 'TAVI / TAVR',
    image:
      'https://imgs.search.brave.com/XsmjAiSdWiFmNNvUY-PLxwBniPiiuOor28x3XQefghY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aGVhcnQub3JnLy0v/bWVkaWEvSW1hZ2Vz/L0hlYWx0aC1Ub3Bp/Y3MvSGVhcnQtVmFs/dmUtUHJvYmxlbXMt/YW5kLURpc2Vhc2Uv/VEFWUi5qcGc_aD0y/Mzcmdz0zMTcmc2Nf/bGFuZz1lbg',
  },
  {
    title: 'Robotic Knee Replacement',
    image:
      'https://imgs.search.brave.com/0I-hg9xFBVzJ8cdQLaHJIzFfBONZ_D6ytXI3-FDTC0s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9yb2JvdGFz/c2lzdGVkLWtuZWUt/cmVwbGFjZW1lbnQt/MjYwbnctMjQyOTI4/OTkzNy5qcGc',
  },
  {
    title: 'Urology',
    image:
      'https://imgs.search.brave.com/XyLbrImoRxCnZx6Hw7l4j8dLCDw6-yT-bOETS8OQRP0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cm9s/b2d5Y2xpbmljcy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDEvZ2VuZXJh/bC1oZWFsdGgtY29w/eS53ZWJw',
  },
  {
    title: 'Rehabilitation',
    image:
      'https://imgs.search.brave.com/dAhyvrhN9RuiO0JPMsGgQ5pBQqB4cWVKo_3_idw5FQM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzAyLzMwLzgw/LzM2MF9GXzIwMjMw/ODA4MF9MS0JQY3U3/eFdGdnh3d0dCbTJX/dXJ6NmNmSWdIRGpE/Ty5qcGc',
  },
  {
    title: 'Robotic Surgery',
    image:
      'https://imgs.search.brave.com/nqKqPz0DqQMjkBg2nDBif_5F5b3hgzc42QHP95kjqT8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NjE5ODE5MC9waG90/by9yb2JvdGljLWFz/c2lzdGVkLXN1cmdl/cnktbWFjaGluZS13/aXRoLWR1bW15LXBh/dGllbnQtaW4tb3Bl/cmF0aW5nLXJvb20u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PURMRW11LThPbU9P/ak5FRWd5amV3SEpS/eEM2dWJjenc2bkxS/VS1oS194cjQ9',
  },
];

export function DepartmentInner() {
  return (
    <Container sx={{ textAlign: 'center', py: 5 }}>
      <Grid container spacing={4}>
        {departments.map((member, index) => (
          <Grid key={member.title || index} xs={12} sm={6} md={3}>
            <DepartmentCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

function DepartmentCard({ member }) {
  return (
    <Card
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 200,
          overflow: 'hidden',
          borderRadius: 1,
          mb: 2,
        }}
      >
        <img
          src={member.image}
          alt={member.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          color: 'text.primary',
          lineHeight: 1.3,
        }}
      >
        {member.title}
      </Typography>
    </Card>
  );
}
