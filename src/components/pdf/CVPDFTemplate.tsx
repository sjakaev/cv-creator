import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { CVData } from '@/lib/types/cv';

// Function for basic Markdown processing
const processMarkdown = (text: string) => {
  if (!text) return [];

  // Split text into lines
  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Process lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return { type: 'listItem', content: line.trim().substring(2), key: `li-${index}` };
    }

    // If the line is empty, create a break
    if (line.trim() === '') {
      return { type: 'break', content: '', key: `br-${index}` };
    }

    // Regular text
    return { type: 'paragraph', content: line, key: `p-${index}` };
  });
};

// Function for processing inline formatting
const renderFormattedText = (text: string) => {
  // Replace **bold text**
  let content = text.replace(/\*\*(.*?)\*\*/g, (_, match) => `{{bold:${match}}}`);

  // Replace *italic*
  content = content.replace(/\*(.*?)\*/g, (_, match) => `{{italic:${match}}}`);

  // Split into parts by formatting tags
  const parts = content.split(/({{bold:.*?}})|({{italic:.*?}})/);

  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith('{{bold:')) {
      const boldText = part.substring(7, part.length - 2);
      return <Text key={index} style={{ fontWeight: 700 }}>{boldText}</Text>;
    }
    if (part.startsWith('{{italic:')) {
      const italicText = part.substring(9, part.length - 2);
      // Use underline instead of italic
      return <Text key={index} style={{ textDecoration: 'underline' }}>{italicText}</Text>;
    }
    return <Text key={index}>{part}</Text>;
  });
};

// Registration of standard PDF fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

// Styles for PDF document
const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Roboto',
      fontSize: 11,
      lineHeight: 1.5,
      color: '#000',
    },
    header: {
      marginBottom: 0,
      textAlign: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 4,
      textAlign: 'center',
    },
    positionTitle: {
      fontSize: 14,
      fontWeight: 400,
      marginBottom: 6,
      color: '#000',
      textAlign: 'center',
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 0,
      justifyContent: 'center',
      borderBottom: '1 solid #999',
    },
    contactItem: {
      marginHorizontal: 4,
      marginBottom: 2,
      fontSize: 10,
      color: '#000',
      textDecoration: 'none',
    },
    contactSeparator: {
      fontSize: 10,
      marginHorizontal: 2,
      color: '#000',
    },
    sectionTitle: {
      fontSize: 12, // Size as in example
      fontWeight: 700,
      marginBottom: 4,
      marginTop: 15,
      // borderBottom: '1 solid #999', // Gray line at bottom
      paddingBottom: 2,
      textTransform: 'uppercase', // Uppercase
      textDecoration: 'underline',
      // backgroundColor: 'skyblue', // Remove background colors
    },
    summary: {
      marginBottom: 0,
      // backgroundColor: 'blue', // Remove background colors
    },
    experienceItem: {
      marginBottom: 0,
      // backgroundColor: 'orange', // Remove background colors
    },
    jobHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    company: {
      fontWeight: 700,
      fontSize: 12, // Slightly larger than main text
    },
    datesContainer: {
      alignItems: 'flex-end',
    },
    dates: {
      fontSize: 10, // Small font for dates
      color: '#555', // Gray color
      textAlign: 'right',
    },
    position: {
      fontWeight: 700,
      fontSize: 11,
      marginBottom: 3,
    },
    location: {
      fontSize: 10,
      color: '#555', // Gray color
      marginBottom: 3,
      textAlign: 'right',
    },
    companyDescription: {
      fontSize: 10,
      marginBottom: 5,
    },
    bulletPoint: {
      width: 5, // Increased marker size
      marginRight: 5,
      marginTop: 2,
    },
    achievement: {
      flexDirection: 'row',
      marginBottom: 3,
      marginLeft: 10, // Indent for text alignment with marker
    },
    achievementText: {
      flex: 1,
    },
    educationItem: {
      marginBottom: 0,
    },
    skillCategory: {
      marginBottom: 8,
    },
    skillCategoryTitle: {
      fontWeight: 700,
      fontSize: 11,
      marginBottom: 3,
    },
    skillList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skill: {
      marginRight: 8,
      marginBottom: 4,
    },
    certificateItem: {
      marginBottom: 5,
    },
    certificateName: {
      fontWeight: 700,
    },
    languageItem: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    languageName: {
      marginRight: 5,
      fontWeight: 700,
    },
  });

// Date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  if (dateString === 'Present') return 'Present';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Если невалидная дата, вернем исходную строку

    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// Component for PDF generation
const CVPDFTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, summary, workExperience, education, skills, certificates, languages } = data;

  // Create an array of contact information for more flexible display
  const contactItems = [];

  if (personalInfo.country && personalInfo.city) {
    contactItems.push(`${personalInfo.country}, ${personalInfo.city}`);
  }

  if (personalInfo.phone) {
    contactItems.push({
      text: personalInfo.phone,
      isLink: true,
      link: `tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`
    });
  }

  if (personalInfo.email) {
    contactItems.push({
      text: personalInfo.email,
      isLink: true,
      link: `mailto:${personalInfo.email}`
    });
  }

  if (personalInfo.linkedin) {
    // Create a component for LinkedIn with correct link
    contactItems.push({
      text: `linkedin.com/in/${personalInfo.linkedin}/`,
      isLink: true,
      link: `https://www.linkedin.com/in/${personalInfo.linkedin}/`,
      linkTarget: '_blank'
    });
  }

  if (personalInfo.telegram) {
    contactItems.push(`Telegram: ${personalInfo.telegram}`);
  }

  if (personalInfo.website) {
    // Create a component for Website with correct link
    contactItems.push({
      text: personalInfo.website.replace(/^https?:\/\/(www\.)?/i, ''),
      isLink: true,
      link: personalInfo.website.startsWith('http')
        ? personalInfo.website
        : `https://${personalInfo.website}`,
      linkTarget: '_blank'
    });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title and contact information */}
        <View style={styles.header}>
          {/* First and last name */}
          <Text style={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>

          {/* Position */}
          {personalInfo.position && <Text style={styles.positionTitle}>{personalInfo.position}</Text>}

          {/* Contact information */}
          <View style={styles.contactInfo}>
            {contactItems.map((item, index) => (
              <React.Fragment key={index}>
                {typeof item === 'string' ? (
                  <Text style={styles.contactItem}>{item}</Text>
                ) : (
                  <Link src={item.link} style={styles.contactItem}>{item.text}</Link>
                )}
                {index < contactItems.length - 1 && (
                  <Text style={styles.contactSeparator}>•</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* About me */}
        {summary && (
          <>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summary}>
              <Text>{summary}</Text>
            </View>
          </>
        )}

        {/* Professional Experience */}
        {workExperience && workExperience.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {workExperience.map((job, index) => (
              <View key={job.id || index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{job.company}</Text>
                  <View style={styles.datesContainer}>
                    <Text style={styles.dates}>
                      {formatDate(job.startDate)} - {job.endDate === 'Present' ? 'Present' : formatDate(job.endDate)}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={styles.position}>{job.position}</Text>
                  {job.location && <Text style={styles.location}>{job.location}</Text>}
                </View>
                {job.companyDescription && <Text style={styles.companyDescription}>{job.companyDescription}</Text>}

                {job.achievements && job.achievements.length > 0 && job.achievements.map((achievement, idx) => (
                  <View key={idx} style={styles.achievement}>
                    <Text style={styles.bulletPoint}>• </Text>
                    <Text style={styles.achievementText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={edu.id || index} style={styles.educationItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{edu.specialization}</Text>
                  <View style={styles.datesContainer}>
                    <Text style={styles.dates}>
                      {formatDate(edu.startDate)} - {edu.endDate === 'Present' ? 'Present' : formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={styles.position}>{edu.university}</Text>
                  {edu.location && <Text style={styles.location}>{edu.location}</Text>}
                </View>
              </View>
            ))}
          </>
        )}

        {/* Skills */}
        {skills && skills.description && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.summary}>
              {processMarkdown(skills.description).map((item) => {
                switch (item.type) {
                  case 'listItem':
                    return (
                      <View key={item.key} style={{ flexDirection: 'row', marginBottom: 2, marginLeft: 10 }}>
                        <Text style={{ marginRight: 5 }}>• </Text>
                        <Text style={{ flex: 1 }}>{renderFormattedText(item.content)}</Text>
                      </View>
                    );
                  case 'break':
                    return <View key={item.key} style={{ height: 3 }} />;
                  case 'paragraph':
                  default:
                    return (
                      <Text key={item.key} style={{ marginBottom: 3 }}>
                        {renderFormattedText(item.content)}
                      </Text>
                    );
                }
              })}
            </View>
          </>
        )}

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {certificates.map((cert, index) => (
              <View key={cert.id || index} style={styles.certificateItem}>
                <Text>
                  <Text style={styles.certificateName}>{cert.name}</Text>
                  {cert.issuer && <Text>, {cert.issuer}</Text>}
                  {cert.date && <Text> ({formatDate(cert.date)})</Text>}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang, index) => (
              <View key={lang.id || index} style={styles.summary}>
                {processMarkdown(lang.description).map((item) => {
                  if (item.type === 'paragraph') {
                    return (
                      <Text key={item.key} style={{ marginBottom: 3 }}>
                        {renderFormattedText(item.content)}
                      </Text>
                    );
                  } else if (item.type === 'listItem') {
                    return (
                      <View key={item.key} style={styles.achievement}>
                        <Text style={{ marginRight: 5 }}>•</Text>
                        <Text style={styles.achievementText}>
                          {renderFormattedText(item.content)}
                        </Text>
                      </View>
                    );
                  } else if (item.type === 'break') {
                    return <View key={item.key} style={{ marginBottom: 3 }} />;
                  }
                  return null;
                })}
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};

export default CVPDFTemplate;
