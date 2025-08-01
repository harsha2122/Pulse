// ============================================
// src/sections/medications/view/documents-view.jsx
// Standalone Documents Page (Dark Mode Compatible)
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

import { formatFileSize, formatDateTime } from 'src/_mock/medications';

import { Iconify } from 'src/components/iconify';

export function DocumentsView() {
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');
  const theme = useTheme();
  const { documents, loading, filterDocuments, patient } = useMedication();

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setDocumentTypeFilter(type);
    filterDocuments(type);
  };

  const handleAddDocument = () => {
    console.log('Add document - Open upload dialog');
  };

  const handleFilter = () => {
    console.log('Show filter options');
  };

  const getDocumentIcon = (docType) => {
    switch (docType) {
      case 'medical_report': return 'solar:document-text-bold';
      case 'imaging': return 'solar:gallery-bold';
      case 'prescription': return 'solar:pill-bold';
      case 'insurance_card': return 'solar:card-bold';
      default: return 'solar:document-bold';
    }
  };

  const getDocumentColor = (docType) => {
    switch (docType) {
      case 'medical_report': return 'info';
      case 'imaging': return 'secondary';
      case 'prescription': return 'success';
      case 'insurance_card': return 'warning';
      default: return 'default';
    }
  };

  const formatDocumentType = (type) => type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <Typography>Loading documents...</Typography>
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
            <Iconify icon="solar:document-bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage medical documents and files
            </Typography>
          </Box>
        </Stack>

        {/* Patient Info */}
        <Card
          sx={{
            p: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'info.dark' : 'info.lighter',
            border: 1,
            borderColor: 'info.main',
            color: theme.palette.mode === 'dark' ? 'info.contrastText' : 'inherit'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
              {patient?.first_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  color: theme.palette.mode === 'dark' ? 'info.contrastText' : 'inherit'
                }}
              >
                {patient?.first_name} {patient?.last_name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'info.contrastText' : 'text.secondary',
                  opacity: theme.palette.mode === 'dark' ? 0.8 : 1
                }}
              >
                Patient ID: {patient?.patient_id} • Total Documents: {documents.length}
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
                value={documentTypeFilter}
                onChange={handleFilterChange}
                displayEmpty
                sx={{
                  '& .MuiSelect-select': {
                    color: 'text.primary'
                  }
                }}
              >
                <MenuItem value="all">Document Type</MenuItem>
                <MenuItem value="medical_report">Medical Report</MenuItem>
                <MenuItem value="imaging">Imaging</MenuItem>
                <MenuItem value="prescription">Prescription</MenuItem>
                <MenuItem value="insurance_card">Insurance Card</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleFilter}
            >
              <IconButton color="primary" size="small">
                <Iconify icon="solar:filter-bold" />
              </IconButton>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                Filter
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Documents List */}
      <Box>
        {documents.length === 0 ? (
          <Card sx={{ p: 5, textAlign: 'center' }}>
            <Iconify
              icon="solar:document-bold"
              sx={{
                fontSize: 64,
                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                mb: 2
              }}
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No documents found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {documentTypeFilter === 'all'
                ? 'Upload your first medical document'
                : `No ${formatDocumentType(documentTypeFilter).toLowerCase()} documents found`}
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {documents.map((document) => (
              <Card
                key={document.id}
                sx={{
                  p: { xs: 2, sm: 3 },
                  border: 1,
                  borderColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                  transition: 'all 0.2s',
                  bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
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
                        bgcolor: theme.palette.mode === 'dark'
                          ? `${getDocumentColor(document.document_type)}.dark`
                          : `${getDocumentColor(document.document_type)}.lighter`,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Iconify
                        icon={getDocumentIcon(document.document_type)}
                        sx={{
                          color: theme.palette.mode === 'dark'
                            ? `${getDocumentColor(document.document_type)}.light`
                            : `${getDocumentColor(document.document_type)}.main`,
                          fontSize: { xs: 20, sm: 24 }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {document.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {document.description}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    {document.is_sensitive && (
                      <Chip
                        label="SENSITIVE"
                        color="error"
                        variant="filled"
                        size="small"
                        sx={{ fontSize: '0.65rem', fontWeight: 600 }}
                      />
                    )}
                    <IconButton size="small">
                      <Iconify icon="eva:more-horizontal-fill" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Document Info Cards */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark'
                        ? `${getDocumentColor(document.document_type)}.dark`
                        : `${getDocumentColor(document.document_type)}.lighter`,
                      flex: 1,
                      border: theme.palette.mode === 'dark' ? 1 : 0,
                      borderColor: theme.palette.mode === 'dark'
                        ? `${getDocumentColor(document.document_type)}.main`
                        : 'transparent'
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify
                        icon="solar:folder-bold"
                        sx={{
                          color: theme.palette.mode === 'dark'
                            ? `${getDocumentColor(document.document_type)}.light`
                            : `${getDocumentColor(document.document_type)}.main`,
                          fontSize: 16
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.mode === 'dark'
                              ? `${getDocumentColor(document.document_type)}.light`
                              : `${getDocumentColor(document.document_type)}.dark`,
                            fontWeight: 600
                          }}
                        >
                          Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.mode === 'dark'
                              ? `${getDocumentColor(document.document_type)}.contrastText`
                              : `${getDocumentColor(document.document_type)}.dark`
                          }}
                        >
                          {formatDocumentType(document.document_type)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>

                  <Card
                    sx={{
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                      flex: 1,
                      border: theme.palette.mode === 'dark' ? 1 : 0,
                      borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'transparent'
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:database-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Size
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {formatFileSize(document.file_size)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Stack>

                {/* Tags */}
                {document.tags && document.tags.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Tags
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {document.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={`#${tag}`}
                          color="primary"
                          variant={theme.palette.mode === 'dark' ? 'filled' : 'outlined'}
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            height: 24,
                            mb: 0.5,
                            ...(theme.palette.mode === 'dark' && {
                              bgcolor: 'primary.dark',
                              color: 'primary.contrastText',
                              border: '1px solid',
                              borderColor: 'primary.main'
                            })
                          }}
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
                      {formatDateTime(document.uploaded_at)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:user-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      By {document.uploaded_by.first_name} {document.uploaded_by.last_name}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Floating Action Button */}
      <Tooltip title="Upload New Document" placement="left">
        <Fab
          color="primary"
          onClick={handleAddDocument}
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
            color: 'primary.contrastText',
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
