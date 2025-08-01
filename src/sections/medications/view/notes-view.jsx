// ============================================
// src/sections/medications/view/notes-view.jsx
// Standalone Notes Page with Dark Mode Support
// ============================================

import { useState } from 'react';

import {
  Box,
  Fab,
  Card,
  Chip,
  Stack,
  Select,
  Avatar,
  Tooltip,
  Divider,
  MenuItem,
  useTheme,
  Container,
  Typography,
  IconButton,
  FormControl
} from '@mui/material';

import { useMedication } from 'src/hooks/use-medication';

import { formatDateTime } from 'src/_mock/medications';

import { Iconify } from 'src/components/iconify';

export function NotesView() {
  const theme = useTheme();
  const [noteTypeFilter, setNoteTypeFilter] = useState('all');
  const { notes, loading, filterNotes, patient } = useMedication();

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setNoteTypeFilter(type);
    filterNotes(type);
  };

  const handleAddNote = () => {
    console.log('Add note - Open dialog');
  };

  const handleSort = () => {
    console.log('Show sort options');
  };

  const getNoteColor = (noteType) => {
    switch (noteType) {
      case 'clinical': return 'info';
      case 'nursing': return 'success';
      case 'administrative': return 'warning';
      case 'therapy': return 'secondary';
      case 'consultation': return 'primary';
      default: return 'default';
    }
  };

  const getNoteIcon = (noteType) => {
    switch (noteType) {
      case 'clinical': return 'solar:health-bold';
      case 'nursing': return 'solar:user-heart-bold';
      case 'administrative': return 'solar:document-bold';
      case 'therapy': return 'solar:hand-heart-bold';
      case 'consultation': return 'solar:chat-dots-bold';
      default: return 'solar:note-bold';
    }
  };

  const formatNoteType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Dark mode aware colors
  const getIconBgColor = (noteType) => {
    const isDark = theme.palette.mode === 'dark';
    const color = getNoteColor(noteType);
    return isDark ? `${theme.palette[color].dark}40` : theme.palette[color].lighter;
  };

  const getIconColor = (noteType) => {
    const isDark = theme.palette.mode === 'dark';
    const color = getNoteColor(noteType);
    return isDark ? theme.palette[color].light : theme.palette[color].main;
  };

 const getCardBorderColor = () =>
  theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[200];

 const getCardHoverBorderColor = () => theme.palette.primary.main;

const getNoteContentBgColor = () =>
  theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50];

const getNoteContentBorderColor = () =>
  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200];

 const getPatientCardBgColor = () =>
  theme.palette.mode === 'dark'
    ? `${theme.palette.info.dark}30`
    : theme.palette.info.lighter;

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <Typography>Loading notes...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'info.main' }}>
            <Iconify icon="solar:note-bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View clinical notes and assessments
            </Typography>
          </Box>
        </Stack>

        {/* Patient Info */}
        <Card
          sx={{
            p: 2,
            bgcolor: getPatientCardBgColor(),
            border: 1,
            borderColor: 'info.main'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
              {patient?.first_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {patient?.first_name} {patient?.last_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Patient ID: {patient?.patient_id} • Total Notes: {notes.length}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Box>

      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 250 } }}>
              <Select
                value={noteTypeFilter}
                onChange={handleFilterChange}
                displayEmpty
              >
                <MenuItem value="all">Note Type</MenuItem>
                <MenuItem value="clinical">Clinical</MenuItem>
                <MenuItem value="nursing">Nursing</MenuItem>
                <MenuItem value="administrative">Administrative</MenuItem>
                <MenuItem value="therapy">Therapy</MenuItem>
                <MenuItem value="consultation">Consultation</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleSort}
            >
              <IconButton color="primary" size="small">
                <Iconify icon="solar:sort-bold" />
              </IconButton>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                Sort
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Notes List */}
      <Box>
        {notes.length === 0 ? (
          <Card sx={{ p: 5, textAlign: 'center' }}>
            <Iconify icon="solar:note-bold" sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No notes found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {noteTypeFilter === 'all'
                ? 'Clinical notes and assessments will appear here'
                : `No ${noteTypeFilter} notes found`}
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {notes.map((note) => (
              <Card
                key={note.id}
                sx={{
                  p: { xs: 2, sm: 3 },
                  border: 1,
                  borderColor: getCardBorderColor(),
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: getCardHoverBorderColor(),
                    boxShadow: (t) => t.shadows[4],
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {/* Header Row */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                  spacing={2}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: getIconBgColor(note.note_type),
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Iconify
                        icon={getNoteIcon(note.note_type)}
                        sx={{
                          color: getIconColor(note.note_type),
                          fontSize: { xs: 20, sm: 24 }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {note.title}
                      </Typography>
                      <Chip
                        label={formatNoteType(note.note_type)}
                        color={getNoteColor(note.note_type)}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    {note.is_confidential && (
                      <Chip
                        label="CONFIDENTIAL"
                        color="error"
                        variant="filled"
                        size="small"
                        icon={<Iconify icon="solar:lock-bold" />}
                        sx={{ fontWeight: 600, fontSize: '0.65rem' }}
                      />
                    )}
                    <IconButton size="small">
                      <Iconify icon="eva:more-horizontal-fill" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Note Type Badge */}
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={formatNoteType(note.note_type)}
                    color={getNoteColor(note.note_type)}
                    variant="filled"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                {/* Note Content */}
                <Card
                  sx={{
                    mb: 2,
                    p: 3,
                    bgcolor: getNoteContentBgColor(),
                    border: 1,
                    borderColor: getNoteContentBorderColor()
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {note.content}
                  </Typography>
                </Card>

                {/* Tags */}
                {note.tags && note.tags.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Tags
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {note.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={`#${tag}`}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ fontSize: '0.75rem', height: 24, mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                <Divider sx={{ mb: 2 }} />

                {/* Footer Info */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:calendar-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(note.created_at)} at {formatTime(note.created_at)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:user-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      By {note.created_by.first_name} {note.created_by.last_name}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Floating Action Button */}
      <Tooltip title="Add New Note" placement="left">
        <Fab
          color="primary"
          onClick={handleAddNote}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000
          }}
        >
          <Iconify icon="eva:plus-fill" />
        </Fab>
      </Tooltip>

      {/* Add Record Label */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 90 },
          right: { xs: 16, sm: 24 },
          zIndex: 999
        }}
      >
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
            boxShadow: 2
          }}
        >
          Add Record
        </Typography>
      </Box>
    </Container>
  );
}
