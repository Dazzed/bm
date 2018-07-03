import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';

import StyledText from './styledText';

@observer
export default class TermsAndConditions extends React.Component {
    render() {
        return <View style={{flex: 1}}>
            <StyledText>
                BluMartini
            </StyledText>

            <StyledText>
                Privacy Policy
            </StyledText>

            <StyledText>
                Updated July 1, 2018
            </StyledText>

            <StyledText>
                This Privacy Policy sets forth how personal information is collected and used, that is provided on https://blumartini.com/ and the associated mobile application known as “BluMartini” as owned and operated by BluMartini Inc.  By using blumartini.com, you agree to be bound by the terms and conditions of this agreement and BluMartini’s privacy and security policy, as they may be amended from time to time in the future (see “Changes to this Policy” below).
            </StyledText>

            <StyledText>
                BluMartini is committed to maintaining the confidentiality, integrity, and security of all of our users’ personal information.  This privacy and security policy explains how we protect personal information provided through our website blumartini.com (“Site”) and how we use that information in connection with our service offered through the Site (“Service”).  For purposes of this policy, “personal information” means information that identifies you.
            </StyledText>

            <StyledText>
                BluMartini emphasizes its privacy and security standards to guard against identity theft and provide security for your personal information.  We regularly re-evaluate our privacy and security policies and adapt them as necessary to deal with new challenges.
            </StyledText>

            <StyledText>
                Transfer of Personal Data
            </StyledText>

            <StyledText>
                The Service is hosted and operated in the United States (“U.S.”), with parts of development, support, and maintenance operations in other countries.  If you do not reside in the U.S., laws in the U.S. (and other countries) may differ from the laws where you reside.  By using the Service, you acknowledge that any Personal Data about you, regardless of whether provided by you or obtained from a third party, is being provided to BluMartini in the U.S. and will be hosted on U.S. servers, and you authorize BluMartini to transfer, store, host, and process your information to and in the U.S. and possibly other countries.  You hereby consent to transfer your data to the U.S. pursuant to either, at BluMartini’s discretion, the EU-U.S. Privacy Shield Framework, the details of which are further set forth below, or the standard data protection clauses promulgated by the EC.
            </StyledText>

            <StyledText>
                EU Personal Data
            </StyledText>

            <StyledText>
                If you are located in the EU, United Kingdom, Lichtenstein, Norway, or Iceland, you may additional rights under the EU General Data Protection Regulation (the “GDPR”) related to your Personal Data, as further described below.  BluMartini will be the controller of your Personal Data processed in connection with the Service, unless you access the Service through an enterprise account, or other BluMartini account that is controlled by a third party -- e.g., your employer.
            </StyledText>

            <StyledText>
                EU-U.S. Privacy Shield Participation
            </StyledText>

            <StyledText>
                BluMartini complies with the EU-U.S. Privacy Shield Framework as set forth by the U.S. Department of Commerce regarding the collection, use, and retention of Personal Data transferred from the EU to the U.S.  BluMartini has certified to the Department of Commerce that it adheres to the Privacy Shield Principles of (1) Notice; (2) Choice; (3) Accountability for Onward Transfer; (4) Security; (5) Data Integrity and Purpose Limitation; (6) Access and (7) Recourse, Enforcement and Liability (collectively, the “Privacy Shield Principles”).  If there is any conflict between the terms in this Privacy Policy and the Privacy Shield Principles, the Privacy Shield Principles shall govern with respect to all Personal Data transferred from the EU to the U.S.  To learn more about the Privacy Shield program, and to view our certification, please visit https://www.privacyshield.gov/.  As further set forth in the Privacy Shield Principles, we remain potentially liable if a third party processing Personal Data received from the EU on our behalf processes that Personal Data in a manner that is inconsistent with the Privacy Shield Principles (unless we can prove that we are not responsible for the event giving rise to the damage).  BluMartini is subject to the investigatory and enforcement powers of the Federal Trade Commission with respect to any failure to comply with the Privacy Shield Principles.  EU individuals with inquiries or complaints regarding U.S. privacy practices should contact us at support@blumartini.com.
            </StyledText>

            <StyledText>
                Personal Information Collected
            </StyledText>

            <StyledText>
                We collect the following personal information from you:
            </StyledText>

            <StyledText>
                Contact -- name, email, mailing address, phone number
            </StyledText>

            <StyledText>
                Billing -- credit card number and billing address
            </StyledText>

            <StyledText>
                Financial -- bank or brokerage account numbers, types of investments
            </StyledText>

            <StyledText>
                Social security number
            </StyledText>

            <StyledText>
                Driver’s license number
            </StyledText>

            <StyledText>
                Unique identifiers -- username, account number, password
            </StyledText>

            <StyledText>
                Demographic -- age, gender, education, interests, zip code
            </StyledText>

            <StyledText>
                When you download and use our Services, we automatically collect information on the type of device you use, operating system version, and the device identifier (or “UDID”).
            </StyledText>

            <StyledText>
                Information Sharing
            </StyledText>

            <StyledText>
                BluMartini uses and discloses your personal information only as follows:
            </StyledText>

            <StyledText>
                To analyze site usage and improve the Service;
            </StyledText>

            <StyledText>
                To deliver to you any administrative notices, money alerts, and communications relevant to your use of the Service;
            </StyledText>

            <StyledText>
                To fulfill your requests for certain products and services;
            </StyledText>

            <StyledText>
                For market research, project planning, troubleshooting problems, detecting and protecting against error, fraud or other criminal activity;
            </StyledText>

            <StyledText>
                To third-party contractors that provide services to BluMartini and are bound by these same privacy restrictions;
            </StyledText>

            <StyledText>
                To enforce BluMartini’s Terms and Conditions; and as otherwise set forth in this privacy and security policy.
            </StyledText>

            <StyledText>
                In the event that you access the Service as brought to you by one of our co-brand partners, through a co-branded URL, your email address used for registration on the Service may be provided to the co-brand partner.
            </StyledText>

            <StyledText>
                In addition, we may, from time to time, offer promotions with various businesses, websites, mobile applications or third parties, which include opportunities for you to earn deposits within your BluMartini account.  Each such promotion will be subject to and governed by our Terms and Conditions, this Privacy Policy, and any applicable rules or terms we post online, include within email or other communications or otherwise make available to you.  To the extent you elect to participate in any such promotion or otherwise make any purchase subject to a promotion, we may share personal information such as name, email, purchase dates, and other related information with the applicable third party for the limited purpose of allowing the parties to make the promotion available and track participation within such promotion.
            </StyledText>

            {/*<StyledText>*/}
                {/*We may use information you provide to connect you with people you may already know.  For example, through the mobile application we may identify contacts within your address book as potential new users of BluMartini.  We may match the contact information you provide to the information provided by other users to improve the BluMartini Service, including making it easier to find contacts you may refer to BluMartini that are not already customers.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*We may also disclose your personal information as required by law, such as to comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*If BluMartini Inc. is involved in a merger, acquisition, or sale of all or a portion of its assets, you will be notified via email and/or a prominent notice on our Site of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*User Access and Choice*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*If the personal information on file for you changes, or if you no longer desire our Service, you may correct or update it by making the change on our member information page or by emailing Customer Support (support@blumartini.com)*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*We will retain and use your information as necessary to comply with our legal and/or regulatory obligations, resolve disputes, and enforce our agreements.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*Cookies / Tracking Technologies*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*A cookie is a small text file that is stored on a user’s computer or mobile device for record-keeping purposes.  We use cookies on this Site.  We do not link the information we store in cookies to any personally identifiable information you submit while on our Site.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*We use both session ID cookies and persistent cookies.  A session ID cookie expires when you close your browser.  A persistent cookie remains on your hard drive for an extended period of time.  You can remove persistent cookies by following directions provided in your internet browser’s “help” directory.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*If you reject cookies, you may still use our Site, but your ability to use some areas of our Site such as contests or surveys, will be limited.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*The use of cookies by our partners, affiliates, tracking utility company, and service providers are not covered by our privacy statement.  We do not have access or control over these cookies.  Our partners, affiliates, tracking utility company, and service providers use session ID cookies to make it easier for you to navigate our Site.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*We employ (or our third party advertising partner employs) a software technology called clear GIFs (web beacons/web bugs), that help us better manage content on our Site by informing us what content is effective.  Clear GIFs are tiny graphics with a unique identifier, similar in function to cookies, and are used to track the online movements of web users.  In contrast to cookies, which is stored on a user’s computer or mobile device, clear GIFs are embedded invisibly on web pages and are about the size of the period at the end of this sentence.  We do not tie the information gathered by clear GIFs to our customers’ personally identifiable information.*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*Security*/}
            {/*</StyledText>*/}

            {/*<StyledText>*/}
                {/*The security of your personal information is of utmost importance to us.  When you enter sensitive information, such as credit card number or financial information, on our forms, we fully encrypt the transmission of that information using 256-bit encryption and Secure Sockets Layer (SSL) technology.*/}
            {/*</StyledText>*/}

            <StyledText>
                We follow generally accepted standards to protect the personal information submitted to us, both during transmission and once we receive it.  No method or transmission over the internet, or method of electronic storage, is 100% secure, however.  Therefore, we cannot guarantee its absolute security.  If you have questions about security on our Site, please contact us at support@blumartini.com.
            </StyledText>

            <StyledText>
                California Privacy Rights
            </StyledText>

            <StyledText>
                Pursuant to Section 1798.83 of the California Civil Code, residents of California can obtain certain information about the types of Personal Data that companies with whom they have an established business relationship have shared with third parties for direct marketing purposes during the proceeding calendar year.  In particular, the law provides that companies must inform consumers about the categories of Personal Data that have been shared with third parties, the names and addresses of those third parties, and examples of the types of services or products marketed by those third parties.  To request a copy of the information disclosure provided by BluMartini pursuant to Section 1798.83 of the California Civil Code, please contact as set forth above.
            </StyledText>

            <StyledText>
                Privacy Shield Inquiries
            </StyledText>

            <StyledText>
                We also commit to resolve complaints about your privacy and our collection or use of Personal Data transferred from the EU to the U.S. in compliance with the Privacy Shield Principles where applicable and have further committed to refer unresolved Privacy Shield complaints to JAMS, an alternative dispute resolution provider located in the U.S. If you do not receive timely acknowledgment of your Privacy Shield-related complaint from us, or if we have not resolved your complaint, you may contact or visit JAMS by visiting http://www.jamsadr.com/eu-us-privacy-shield for more information or to file a complaint, at no cost to you.  Under certain conditions, you may also be entitled to invoke binding arbitration for residual claims about whether we have violated our obligations to you under the Privacy Shield, and if that violation remains fully or partially unremedied.
            </StyledText>

            <StyledText>
                Children
            </StyledText>

            <StyledText>
                Our Service is intended for people 18 years of age or older (EU may be different).  BluMartini does not knowingly acquire or receive Personal Data from anyone under the age of 18.  If we later learn that any user of our Service is under the age of 18, we will take appropriate steps to remove that user’s information from our account database and will restrict that individual from future access to the Service.
            </StyledText>

            <StyledText>
                Changes to this Policy
            </StyledText>

            <StyledText>
                We may update this Privacy Policy to reflect changes to our information practices.  If we make any material changes we will notify you via email or by means of a notice on our Site prior to the change becoming effective.  We encourage you to periodically review this page for the latest information on our privacy practices.
            </StyledText>

            <StyledText>
                Contact Us
            </StyledText>

            <StyledText>
                If you have any questions about our Privacy Policy, please contact us at the information below.  We value your feedback and opinions as they are of paramount importance to us in helping us build you a better product that you will love.
            </StyledText>

            <StyledText>
                BluMartini Inc.
            </StyledText>

            <StyledText>
                support@blumartini.com
            </StyledText>

        </View>
    }
}


