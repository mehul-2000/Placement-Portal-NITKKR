const from = '"Placement Portal" <tnpoffice@nitkkr.ac.in>';
// const baseUrl = 'http://';
const email_signature = '<br><br>With Regards.<br><br>Training & Placement Cell<br>National Institute of Technology Kurukshetra<br>Email: tnpoffice@nitkkr.ac.in<br>Phone: 01744 233302; 233303';

exports.getEmailOpts = (data, mailType) => {

    switch (mailType) {

        case 'sendOTP':
            return {
                from : from,
                to:  data.college_email,
                subject: 'Login Request : Placement Cell, NIT Kurukshetra',
                text: 'Hello '+ data.name + 'We have received a login request for your account.Please find the below OTP to proceed further.',
                html: 'Hello <strong>'+ data.name + '</strong>,<br><br>A sign in attempt to Placement Portal requires further verification to prevent unauthorized access to your account. To complete the sign in, enter the verification code on the Placement Portal.<br><br>Verification Code: ' + data.login_otp + email_signature
            }
            break;

        case 'forgotPassword':
            return {
                from: from,
                to: data.college_email,
                subject: 'Reset Password Request : Placement Cell, NIT Kurukshetra',
                text: 'Hello '+ data.name + 'You requested for the reset password.Please find the below link Reset password.',
                html: 'Hello <strong>'+ data.name + '</strong>,<br><br>You requested for the reset password. Please find the below link<br><br><a href="' + data.reset_password_url + '">Reset password</a>'+ email_signature
            }
            break;

        case 'approveInterviewExperience':
            return {
                from: from,
                to: data.author_email,
                subject: 'Yay! We have published your article ' + data.title,
                text: 'Hello '+ data.author_name + 'Thanks for sharing your interview process and thoughts with us With Regards, Training & Placement Cell',
                html: 'Hello <strong>'+ data.author_name + '</strong>,<br><br>Thanks for sharing your interview process and thoughts with us to help others. We have published your interview experience. We wish you luck for the future! Please find the link below -<br><br><a href="' + data.url + '">' + data.title + ' </a>'+ email_signature
            };
            break;

        case 'companyAdded':
            return {
                from: from,
                to: data.emails,
                subject: 'Company Specific Registration: ' + data.company_name,
                text: 'Dear Students,\nCompany Name: '+data.company_name+'\nProfile: '+data.job_profile+'\nJob Location: '+data.posting_locatioin+'\nDeadline: '+data.deadline_date+'\nWith Regards, Prof. Mahendar Choudhary',
                html: 'Dear Students,<br><br><table border="1|0" style="border-collapse: collapse"><tr><td><strong>Company Name:</strong></td><td>'+data.company_name+'</td></tr><tr><td><strong>Company URL:</strong></td><td>'+data.company_website_url+'</td></tr><tr><td><strong>Organization Type:</strong></td><td>'
                +data.organization_type+'</td></tr><tr><td><strong>Industry Sector:</strong></td><td>'+data.industry_sector+'</td></tr><tr><td><strong>About Company:</strong></td><td>'+data.about_company+'</td></tr><tr><td><strong>Profile:</strong></td><td>'+data.job_profile+'</td></tr><tr><td><strong>Passout Batch:</strong></td><td>'
                +data.passout_batch+'</td></tr><tr><td><strong>Recruitment Type:</strong></td><td>'+data.recruitment+'</td></tr><tr><td><strong>Duration:</strong></td><td>'+data.duration+'</td></tr><tr><td><strong>Job Location:</strong></td><td>'+data.posting_location+'</td></tr><tr><td><strong>Job Description:</strong></td><td>'
                +data.job_description+'</td></tr><tr><td><strong>Min CGPA:</strong></td><td>'+data.min_cgpa+'</td></tr><tr><td><strong>Min 10%:</strong></td><td>'+data.min_10_percent+'</td></tr><tr><td><strong>Min 12%:</strong></td><td>'+data.min_12_percent+'</td></tr><tr><td><strong>Medical Requirement:</strong></td><td>'
                +data.medical_requirement+'</td></tr><tr><td><strong>Service Agreement:</strong></td><td>'+data.service_agreement+'</td></tr><tr><td><strong>Duration of Agreement:</strong></td><td>'+data.service_agreement_duration+'</td></tr><tr><td><strong>Other Eligibility:</strong></td><td>'
                +data.other_eligibility+'</td></tr><tr><td><strong>Package:</strong></td><td>UG: '+data.package.UG.ctc+'<br>MTech: '+data.package.MTech.ctc+'<br>MCA: '+data.package.MCA.ctc+'</td></tr><tr><td><strong>Company Accommodation:</strong></td><td>'
                +data.company_accommodation+'</td></tr><tr><td><strong>Other Facility:</strong></td><td>'+data.other_facility+'</td></tr><tr><td><strong>Deadline:</strong></td><td>'+data.deadline_date+'</td></tr></table><br><a href="'+data.apply_url+'"><strong>Link to register</strong></a><br><br>'+email_signature
            };
            break;

        case 'addCoordinator':
            return {
                from : from,
                to:  data.college_email,
                subject: 'Added as Coordinator : Placement Cell, NIT Kurukshetra',
                text: 'Hello '+ data.name + '. You are successfully added as Student Placement Coordinator of NIT Kurukshetra. Welcome to the team.',
                html: 'Hello <strong>'+ data.name + '</strong>,<br><br>You are successfully added as Student Placement Coordinator of NIT Kurukshetra.<br><br>Welcome to the team.' + email_signature
            }
            break;
    

        default:
            return {}
    }

}
