export const mockAdminData = {
    totalDocuments: 142,
    avgAnalysisTime: 8.2, // in seconds
    documentTypes: [
        { name: 'Lease Agreement', count: 58, color: 'bg-indigo-500' },
        { name: 'Terms of Service', count: 34, color: 'bg-sky-500' },
        { name: 'Employment Contract', count: 25, color: 'bg-emerald-500' },
        { name: 'NDA', count: 18, color: 'bg-amber-500' },
        { name: 'Other', count: 7, color: 'bg-slate-500' },
    ],
    commonQueries: [
        "What is the notice period for termination?",
        "Can I sublet the property?",
        "Explain the confidentiality clause.",
        "What are the penalties for late payment?",
        "Is there a non-compete clause?",
    ],
    frequentRisks: [
        "Ambiguous liability terms",
        "Auto-renewal clause without clear notification",
        "Unilateral right to modify terms",
        "Broad confidentiality obligations",
        "Lack of a clear dispute resolution process",
    ]
};

export const mockAnomalyData = [
    {
        id: 1,
        title: "Unusual Indemnification Clause",
        severity: "High",
        clause: `"The Service Provider agrees to indemnify, defend, and hold harmless the Client against any and all claims, liabilities, damages, and expenses, including attorney's fees, arising from any action whatsoever, without limitation."`,
        explanation: "The phrase 'without limitation' creates unlimited liability, which is a significant deviation from standard agreements that typically cap liability.",
        source: "MSA_Vendor_XYZ.docx"
    },
    {
        id: 2,
        title: "Non-Standard Termination for Convenience",
        severity: "Medium",
        clause: `"This Agreement may be terminated by the Client for any reason with a notice period of ninety (90) days."`,
        explanation: "A 90-day notice period is 3x longer than the portfolio average of 30 days for similar contracts, potentially locking in unfavorable terms.",
        source: "Consulting_Agreement_CorpA.pdf"
    },
    {
        id: 3,
        title: "Absence of a Force Majeure Clause",
        severity: "Medium",
        clause: `N/A`,
        explanation: "This contract is among the 5% in the portfolio that completely omits a Force Majeure clause, leaving the party exposed to liability for unforeseeable events.",
        source: "SaaS_Subscription_TechCo.docx"
    },
    {
        id: 4,
        title: "Below-Market Liability Cap",
        severity: "Low",
        clause: `"The total liability of the Provider under this agreement shall not exceed the fees paid in the preceding one (1) month."`,
        explanation: "The liability cap is limited to 1 month of fees, whereas the standard in 85% of comparable agreements is 12 months, offering significantly less protection.",
        source: "Supplier_Contract_Logistics.pdf"
    }
];

export const sampleDocumentText = `
What is Lease Deed (for a term of years) Rent Agreement?
A rent or lease agreement is an agreement that lays down pre-discussed terms and conditions under which a property is to be rented or leased between a tenant and landlord. A lease agreement is essentially an agreement for leasing of an immovable property for up to 11 months. A rent agreement can be an agreement of more than a year. All important clauses stating the terms, conditions and promises between both the parties must be included in a lease or rent agreement.

Why is Lease Deed (for a term of years) Rent Agreement required?
A lease or rent agreement is an essential document that evidences the leasing or renting of an immovable property. All terms relating to such lease/rent including the time period for such lease and the purpose for which the property must be used, among other terms, must form a part of a rent agreement. Such an agreement serves the purpose of a reference document for all the parties involved.

What should a Lease Deed (for a term of years) Rent Agreement cover?
1. The relevant personal details of the parties such as full name, residential addresses and ages of the parties to the agreement,
2. Details regarding rent and deposit,
3. Duties and responsibilities of and between the parties,
4. Duration of lease/rent or the term of the agreement,
5. Details regarding maintenance, electricity and water charges,
6. Lease/Rent termination and extension,
7. Clause regarding visitation rights of landlord,
8. Clause regarding security amount if any,
9. Penalty clause explaining the details of what the penalty would be if either party defaults in fulfilling its duties in accordance with the agreement,
10. Details of fixtures and schedule of property,
11. General clauses such as termination of agreement, applicable laws, dispute settlement clause, confidentiality, etc.), and
12. Date of signing of the agreement.

What is Deed of Family Trust?
A deed of family trust is a legal arrangement, whereby a person transfers management (and actual ownership in the case of an irrevocable trust) of assets to a third party (member of the family), who holds them and manages them for the benefit of others.

Why is Deed of Family Trust required?
It's not always a good idea to give a significant gift, such as ownership of your home, or a large sum of money, outright to your adult children, or your grandchildren. A Family Trust Deed provides the flexibility, control and protection that you need, to give significant gifts in your lifetime with complete peace of mind.

What is Separation Agreement between Husband and Wife?
A separation agreement between husband and wife is a post-matrimonial agreement through which the married couple decides to part ways without any aid from the judicial system. It is a kind of settlement agreement between parties to the marriage, deciding issues on maintenance, custody of children, division of property, etc.

What is Deed of Adoption?
Adoption involves the creation of the parent-child relationship between individuals who are not naturally so related. The adopted child is given the rights, privileges, and duties of a child and heir by the adoptive family. It is a Legal document wherein all rights and responsibilities, along with filiation, from the biological parent or parents is transferred to adopted parents.

What is Confidential Information and Non-Disclosure Agreement NDA?
A non-disclosure agreement is an agreement wherein one or more parties agree to not divulge certain confidential information. The non-disclosure agreement sets out in detail the nature of such information which is deemed confidential and it ensures that such information is not disclosed to any third party.
`;

export const initialAiResponse = `Beep boop! Dot online! I have carefully scanned the entire document you provided. It's a very helpful guide that explains many different kinds of legal documents in India and provides templates for them.

Think of it like a big recipe book, but for legal situations! Here is a simple summary of the key points I found:

**Agreements for Property:** The document explains **Lease Deeds** and **Rent Agreements**. These are like the official rulebooks that a landlord and tenant agree on before someone moves into a property. It also covers how to divide family property fairly with a **Deed of Family Settlement**.

**Family & Personal Matters:** It describes important personal agreements, such as:
*   **Deed of Family Trust:** A way for a family to manage shared property, like a special savings account that everyone agrees on how to use.
*   **Separation Agreement:** A document for married couples who decide to live apart.
*   **Deed of Adoption:** The official paper that welcomes a child into a new family.

**Business & Work Agreements:** For business needs, the guide covers:
*   **Confidentiality Agreements (NDAs):** This is like making a pinky promise not to share secret information.
*   **Service Agreements:** These are the rules for a job that one person or company does for another.
*   **Trademark & Copyright Licenses:** This is like giving someone permission to use your special brand name or creative work.

**Legal Notices:** A big part of the document explains different types of "warning letters" called Legal Notices. These are sent before taking legal action to solve a problem. Examples include asking for money someone owes you or officially asking to partition a shared property.

In short, this document is a comprehensive overview of many common legal forms used for property, family, and business in India.

If you would like me to explain any of these sections in more detail, just ask! Beep boop! Please remember, I am a helpful AI assistant, not a lawyer. This information is for educational purposes only`;

export const initialSuggestedQuestions = [
    "Tell me more about Lease Deeds.",
    "What is the difference between a Lease and Rent agreement?",
    "When would I need a Deed of Family Trust?",
    "Explain Confidentiality Agreements (NDAs)."
];