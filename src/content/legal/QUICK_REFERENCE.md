# Legal Documents - Quick Reference Guide

## File Locations

All legal documents are stored in: `/src/content/legal/`

```
/src/content/legal/
├── PRIVACY_POLICY_EN.md          English Privacy Policy (420+ lines)
├── PRIVACY_POLICY_KO.md          Korean Privacy Policy (420+ lines)
├── TERMS_OF_SERVICE_EN.md        English Terms of Service (550+ lines)
├── TERMS_OF_SERVICE_KO.md        Korean Terms of Service (550+ lines)
├── README.md                     Implementation & Customization Guide
└── QUICK_REFERENCE.md            This file
```

## Document Statistics

| Document | Language | Lines | Sections | Size |
|----------|----------|-------|----------|------|
| Privacy Policy | English | 420+ | 17 | Comprehensive |
| Privacy Policy | Korean | 420+ | 17 | Professional |
| Terms of Service | English | 550+ | 20 | Comprehensive |
| Terms of Service | Korean | 550+ | 20 | Professional |

**Total Size**: ~2,500+ lines of production-ready legal documentation

## Content Overview

### Privacy Policy

**Key Sections:**
1. Information Collection
2. Information Usage
3. Legal Basis for Processing
4. Information Sharing
5. Data Retention
6. Data Security
7. User Rights & Choices (GDPR, CCPA, COPPA, PIPA)
8. Breach Notification
9. International Transfers
10. Cookies & Tracking
11. Third-Party Services
12. Children's Privacy
13. Do Not Track
14. Policy Updates
15. Contact Information

**Regulatory Coverage:**
- GDPR (EU)
- CCPA/CPRA (California)
- COPPA (US - Children)
- PIPA (Korea)

### Terms of Service

**Key Sections:**
1. Acceptance & Agreement
2. Definitions
3. Eligibility & Registration
4. Service Usage
5. Intellectual Property
6. Payment & Billing
7. Warranties & Disclaimers
8. Liability Limitations
9. Indemnification
10. Term & Termination
11. Dispute Resolution
12. Representations
13. Export Controls
14. Term Changes
15. Severability
16. Third-Party Services
17. Accessibility
18. Notices
19. Contact Information
20. Glossary

**Regulatory Coverage:**
- US Federal & State Law
- CLRA (California Consumer Legal Remedies)
- UCL (California Unfair Competition)
- FAL (California False Advertising)
- ADA (Americans with Disabilities)
- Korean Consumer Protection Act
- Korean E-Commerce Act

## Language Standards

### English Version
- Professional, clear legal language
- Formal tone appropriate for legal documents
- US English spelling and terminology
- Comprehensive coverage of all jurisdictions

### Korean Version
- Formal Korean language (존댓글 - jondaetmal)
- Professional legal terminology
- Compliant with Korean legal requirements
- Consistent with English document structure
- Ready for Korean market deployment

## Before Deployment

### Required Customizations

Replace these placeholders in both English AND Korean versions:

**Email Addresses** (Configure with actual monitored addresses)
```
privacy@leanit.com
dpo@leanit.com
coppa@leanit.com
copyright@leanit.com
support@leanit.com
legal@leanit.com
billing@leanit.com
disputes@leanit.com
accessibility@leanit.com
privacy-complaints@leanit.com
unsubscribe@leanit.com
arbitration@leanit.com
```

**Contact Information**
```
[Company Address]
[Company Street Address]
[City, State/Province, Postal Code, Country]
[Contact Number]
[Officer Name]
```

**Website URLs**
```
https://www.leanit.com
https://www.leanit.com/privacy-requests
https://www.leanit.com/terms-of-service
https://www.leanit.com/cookie-policy
https://www.leanit.com/acceptable-use
https://www.leanit.com/dpa
https://www.leanit.com/security
https://www.leanit.com/contact
```

**Jurisdictional Settings**
```
[State] - for US jurisdiction
[Arbitration Organization] - for dispute resolution
```

## Regulatory Compliance Checklist

### GDPR Compliance ✓
- [x] Lawful basis for processing clearly stated
- [x] Data subject rights documented
- [x] Data Protection Officer contact provided
- [x] 72-hour breach notification requirement
- [x] Data portability rights
- [x] Right to erasure
- [x] International transfer safeguards

### CCPA/CPRA Compliance ✓
- [x] Right to know
- [x] Right to delete
- [x] Right to opt-out
- [x] Right to correct
- [x] Right to access
- [x] Non-discrimination provisions
- [x] 45-day response requirement
- [x] "Do Not Sell" mechanism

### COPPA Compliance ✓
- [x] Child data collection restrictions
- [x] Parental consent requirements
- [x] Parental access rights
- [x] No targeted advertising to children
- [x] Security requirements
- [x] Separate contact email

### PIPA Compliance ✓
- [x] Personal information definition
- [x] User access rights (10-day requirement)
- [x] User correction rights
- [x] User deletion rights
- [x] Processing restriction rights
- [x] Data portability rights
- [x] Consent withdrawal rights

## Implementation Guide

### Step 1: Legal Review
1. Have US counsel review English versions
2. Have Korean counsel review Korean versions
3. Obtain sign-off before deployment
4. Document review process

### Step 2: Customization
1. Replace all email addresses
2. Update company contact information
3. Update all website URLs
4. Set jurisdictional references
5. Verify all information is accurate

### Step 3: Website Implementation
1. Create Privacy Policy page (/pages/PrivacyPolicy.tsx)
2. Create Terms of Service page (/pages/TermsOfService.tsx)
3. Add language toggle (EN/KO)
4. Create privacy request form
5. Create contact form
6. Add footer links
7. Implement cookie consent

### Step 4: Legal Infrastructure
1. Set up privacy request handling
2. Establish data deletion procedures
3. Create breach notification workflow
4. Set up incident response
5. Establish retention schedules
6. Configure COPPA protections
7. Create audit logs

### Step 5: Testing
1. Test all links and URLs
2. Test form submissions
3. Test email delivery
4. Test language switching
5. Verify HTTPS security
6. Conduct security review
7. Obtain final legal approval

## Contact Information Structure

### Privacy Inquiries
- Email: `privacy@leanit.com`
- Phone: `[Contact Number]`
- Web: `https://www.leanit.com/privacy-requests`

### Data Protection Officer
- Email: `dpo@leanit.com`
- Phone: `[Contact Number]`
- Mail: `[Company Address]`

### COPPA (Children's Privacy)
- Email: `coppa@leanit.com`

### Legal/Compliance
- Email: `legal@leanit.com`
- Mail: `[Company Address]`

### Disputes
- Email: `disputes@leanit.com`

### Accessibility
- Email: `accessibility@leanit.com`

## Document Formatting

### Markdown Elements Used
- Headers (H1-H3): Section organization
- Bold text: Key terms and definitions
- Lists: Bullet and numbered
- Links: To internal pages and external resources
- Code blocks: For technical specifications
- Tables: For structured information

### Consistent Formatting Across Languages
- Same section numbering
- Same heading hierarchy
- Same terminology mapping
- Same placeholder structure
- Parallel content in both languages

## Common Customization Errors to Avoid

1. **Incomplete Placeholder Replacement**
   - Ensure ALL instances are replaced
   - Check both EN and KO versions
   - Use search function to verify

2. **URL Mismatches**
   - Verify URLs match actual website structure
   - Test all links before deployment
   - Update dynamically if URLs change

3. **Contact Information**
   - Ensure emails are monitored
   - Verify phone numbers are correct
   - Confirm mailing address is accurate

4. **Legal Jurisdiction**
   - Verify state selection is accurate
   - Confirm arbitration organization
   - Ensure compliance with local laws

5. **Language Consistency**
   - Maintain formal tone in both languages
   - Keep terminology consistent
   - Preserve all legal meaning

## Version Control

**Current Version**: 1.0
**Effective Date**: February 18, 2026
**Last Updated**: February 18, 2026

When updating:
1. Update "Last Updated" date in documents
2. Document changes in version history
3. Have legal review updates
4. Re-deploy updated versions
5. Notify users of changes

## Support & Maintenance

### Regular Review Schedule
- **Quarterly**: Check for law changes
- **Bi-annually**: Review user feedback
- **Annually**: Comprehensive update
- **As Needed**: Address new requirements

### Key Things to Monitor
1. GDPR and CCPA regulation changes
2. COPPA enforcement updates
3. PIPA requirements
4. State-specific privacy laws
5. Court decisions affecting privacy
6. Industry best practices

## Troubleshooting

### Common Issues

**Issue**: Links are broken
- Solution: Verify URLs are correct in customization

**Issue**: Email bounces
- Solution: Ensure email addresses are properly configured

**Issue**: Policy conflicts with business practices
- Solution: Update policy to match actual practices OR update practices to match policy

**Issue**: Users report unclear language
- Solution: Simplify while maintaining legal accuracy

**Issue**: Compliance violations
- Solution: Conduct legal review and implement necessary changes

## Resources

### External References
- GDPR Portal: https://gdpr-info.eu/
- CCPA Guide: https://oag.ca.gov/privacy/ccpa
- COPPA Information: https://www.ftc.gov/business-guidance/privacy-security/coppa
- PIPA Authority: https://www.pipc.go.kr/eng/

### Internal Documentation
- See README.md for detailed implementation guide
- See Privacy Policy sections 7.1-7.4 for specific rights
- See Terms of Service section 11 for dispute resolution

## Key Dates to Remember

- **GDPR**: May 25, 2018 (enforcement)
- **CCPA**: January 1, 2020 (enforcement)
- **CPRA**: January 1, 2023 (enforcement)
- **PIPA**: May 30, 2011 (enforcement)
- **COPPA**: April 21, 2000 (original)
- **LEANIT Policy**: February 18, 2026 (effective)

---

**Quick Reference Guide - Version 1.0**
**Created**: February 18, 2026
**Status**: Production Ready
**For**: LEANIT Corporation
