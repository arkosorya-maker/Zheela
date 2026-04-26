export type Language = 'en' | 'ku' | 'ar';

export const translations = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      books: "Books",
      consulting: "Consulting",
      courses: "Courses",
      faq: "FAQ",
      certificates: "Certificates",
      contact: "Contact",
      admin: "Admin"
    },
    hero: {
      name: "Zheela",
      title: "Business Writer & Consultant",
      tagline: "Elevate your brand with compelling copy and strategic consulting.",
      cta: "Work with me"
    },
    about: {
      title: "About Me",
      bio: "I am a passionate Business Writer and Consultant dedicated to helping brands find their voice and communicate their value effectively. With years of experience in copywriting, strategic planning, and personal branding, I transform complex ideas into engaging narratives.",
      values: ["Clarity over cleverness", "Authentic storytelling", "Strategic thinking", "Result-oriented approach"]
    },
    services: {
      title: "Branding Services",
      subtitle: "Tailored solutions to elevate your brand presence.",
      items: [
        {
          title: "Brand Voice Development",
          description: "Establishing a unique and consistent tone of voice for your brand across all channels."
        },
        {
          title: "Website Copywriting",
          description: "Engaging, SEO-friendly copy that converts visitors into loyal customers."
        },
        {
          title: "Content Strategy",
          description: "Comprehensive planning to ensure your content aligns with your business goals."
        }
      ]
    },
    books: {
      title: "My Books",
      subtitle: "Published works to help you master business writing.",
      items: [
        {
          title: "The Art of Business Writing",
          status: "Available Now"
        },
        {
          title: "Strategic Communication",
          status: "Coming Soon"
        }
      ]
    },
    consulting: {
      title: "Consulting Packages",
      subtitle: "One-on-one guidance to accelerate your growth.",
      items: [
        {
          title: "Starter Strategy",
          price: "$299",
          features: ["1-Hour Strategy Call", "Brand Audit", "Action Plan Document"]
        },
        {
          title: "Comprehensive Overhaul",
          price: "$899",
          features: ["3 Strategy Sessions", "Full Brand Voice Guide", "Website Copy Review", "30-Day Support"]
        }
      ]
    },
    courses: {
      title: "My Courses",
      subtitle: "Learn at your own pace with my curated educational content.",
      items: [
        {
          title: "Mastering Copywriting in 30 Days",
          description: "A complete guide to writing copy that sells.",
          cta: "Enroll Now"
        },
        {
          title: "Personal Branding for Freelancers",
          description: "Build a brand that attracts high-paying clients.",
          cta: "Enroll Now"
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What industries do you specialize in?",
          answer: "I primarily work with B2B tech, professional services, and personal brands. However, my strategic approach can be applied to almost any industry."
        },
        {
          question: "How long does a typical project take?",
          answer: "A standard website copywriting project takes about 2-3 weeks, while comprehensive consulting engagements can last up to 3 months."
        },
        {
          question: "Do you offer custom packages?",
          answer: "Yes! If you don't see a package that fits your exact needs, reach out and we can discuss a customized proposal."
        }
      ]
    },
    certificates: {
      title: "Certificates",
      subtitle: "My professional qualifications & achievements.",
      items: [
        { title: "Advanced Copywriting Strategy", issuer: "Marketing Institute", year: "2023" },
        { title: "B2B Communication Masterclass", issuer: "Business Academy", year: "2022" },
        { title: "SEO Writing Certification", issuer: "Content HubSpot", year: "2021" }
      ]
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Ready to take your business to the next level? Drop me a message on my social channels.",
      social: {
        instagram: "Follow me on Instagram",
        telegram: "Message me on Telegram"
      },
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        submit: "Send Message"
      },
      whatsapp: "Chat on WhatsApp"
    },
    common: {
      information: "Information",
      features: "Features",
      whatIDo: "What I Do",
      choosePlan: "Choose Plan",
      findWithMe: "Find with me",
      allRightsReserved: "All rights reserved.",
      sent: "Sent!",
      messageSent: "Message sent successfully!",
      messageFailed: "Failed to send message."
    }
  },
  ku: {
    nav: {
      services: "براندینگ",
      about: "دەربارە",
      books: "کتێبەکانم",
      consulting: "پاکێجی راوێژکاری",
      courses: "کورسەکان",
      faq: "وەڵامی پرسیارە باوەکان",
      certificates: "بڕوانامەکانم",
      contact: "پەیوەندی",
      admin: "ئادمین"
    },
    hero: {
      name: "ژیلا",
      title: "نووسەری بازرگانی و ڕاوێژکار",
      tagline: "براندەکەت بەرز بکەرەوە بە نووسینی سەرنجڕاکێش و ڕاوێژکاری ستراتیژی.",
      cta: "کارم لەگەڵ بکە"
    },
    about: {
      title: "دەربارەی من",
      bio: "من نووسەرێکی بازرگانی و ڕاوێژکارێکی پەرۆشم، تەرخانکراوم بۆ یارمەتیدانی براندەکان بۆ دۆزینەوەی دەنگی خۆیان و گەیاندنی بەهاکەیان بە شێوەیەکی کاریگەر. بە ئەزموونی چەندین ساڵ لە کۆپیرایتینگ، پلاندانانی ستراتیژی، و براندینگی کەسی، بیرۆکە ئاڵۆزەکان دەگۆڕم بۆ چیرۆکی سەرنجڕاکێش.",
      values: ["ڕوونی پێش زیرەکی", "چیرۆکگێڕانی ڕەسەن", "بیرکردنەوەی ستراتیژی", "نێزیکبوونەوەی لەسەر بنەمای ئەنجام"]
    },
    services: {
      title: "خزمەتگوزارییەکانی براندینگ",
      subtitle: "چارەسەری تایبەت بۆ بەرزکردنەوەی ئامادەیی براندەکەت.",
      items: [
        {
          title: "پەرەپێدانی دەنگی براند",
          description: "دروستکردنی تۆنێکی دەنگی بێهاوتا و یەکگرتوو بۆ براندەکەت لە هەموو کەناڵەکاندا."
        },
        {
          title: "کۆپیرایتینگی وێبسایت",
          description: "نووسینی سەرنجڕاکێش و گونجاو بۆ SEO کە سەردانکەران دەگۆڕێت بۆ کڕیاری دڵسۆز."
        },
        {
          title: "ستراتیژیی ناوەڕۆک",
          description: "پلاندانانی گشتگیر بۆ دڵنیابوون لەوەی ناوەڕۆکەکەت لەگەڵ ئامانجە بازرگانییەکانت دەگونجێت."
        }
      ]
    },
    books: {
      title: "کتێبەکانم",
      subtitle: "بەرهەمە بڵاوکراوەکان بۆ یارمەتیدانت لە شارەزابوون لە نووسینی بازرگانی.",
      items: [
        {
          title: "هونەری نووسینی بازرگانی",
          status: "ئێستا بەردەستە"
        },
        {
          title: "پەیوەندیکردنی ستراتیژی",
          status: "بەمنزیکانە"
        }
      ]
    },
    consulting: {
      title: "پاکێجەکانی ڕاوێژکاری",
      subtitle: "ڕێنمایی یەک بە یەک بۆ خێراکردنی گەشەکردنت.",
      items: [
        {
          title: "ستراتیژیی دەستپێک",
          price: "$299",
          features: ["١ کاتژمێر پەیوەندی ستراتیژی", "هەڵسەنگاندنی براند", "بەڵگەنامەی پلانی کارکردن"]
        },
        {
          title: "گۆڕانکاری گشتگیر",
          price: "$899",
          features: ["٣ دانیشتنی ستراتیژی", "ڕێبەری تەواوی دەنگی براند", "پێداچوونەوەی کۆپی وێبسایت", "پشتیوانی ٣٠ ڕۆژ"]
        }
      ]
    },
    courses: {
      title: "کۆرسەکانم",
      subtitle: "بە خێرایی خۆت فێربە لەگەڵ ناوەڕۆکە پەروەردەییەکانم.",
      items: [
        {
          title: "شارەزابوون لە کۆپیرایتینگ لە ٣٠ ڕۆژدا",
          description: "ڕێبەرێکی تەواو بۆ نووسینی کۆپییەک کە دەفرۆشێت.",
          cta: "ئێستا بەشداری بکە"
        },
        {
          title: "براندینگی کەسی بۆ فریلانسەرەکان",
          description: "براندێک دروست بکە کە کڕیاری پارە بەرز ڕابکێشێت.",
          cta: "ئێستا بەشداری بکە"
        }
      ]
    },
    faq: {
      title: "پرسیارە باوەکان",
      items: [
        {
          question: "پسپۆڕیت لە چ بوارێکدایە؟",
          answer: "من زیاتر کار لەگەڵ تەکنەلۆژیای B2B، خزمەتگوزارییە پیشەییەکان، و براندە کەسییەکان دەکەم. بەڵام، دەتوانرێت نێزیکبوونەوە ستراتیژییەکەم لە نزیکەی هەموو بوارێکدا جێبەجێ بکرێت."
        },
        {
          question: "پڕۆژەیەکی ئاسایی چەند کاتی دەوێت؟",
          answer: "پڕۆژەیەکی ئاسایی کۆپیرایتینگی وێبسایت نزیکەی ٢-٣ هەفتە دەخایەنێت، لە کاتێکدا ڕێکەوتنە ڕاوێژکارییە گشتگیرەکان دەتوانن تا ٣ مانگ بخایەنن."
        },
        {
          question: "ئایا پاکێجی تایبەت پێشکەش دەکەیت؟",
          answer: "بەڵێ! ئەگەر پاکێجێک نابینیت کە بەتەواوی لەگەڵ پێداویستییەکانت بگونجێت، پەیوەندی بکە و دەتوانین گفتوگۆ لەسەر پێشنیارێکی تایبەت بکەین."
        }
      ]
    },
    certificates: {
      title: "بڕوانامەکانم",
      subtitle: "بڕوانامە و دەستکەوتە پیشەییەکانم.",
      items: [
        { title: "ستراتیژی کۆپیرایتینگی پێشکەوتوو", issuer: "پەیمانگای مارکێتینگ", year: "٢٠٢٣" },
        { title: "ماستەرکلاسی پەیوەندیکردنی B2B", issuer: "ئەکادیمیای بازرگانی", year: "٢٠٢٢" },
        { title: "بڕوانامەی نووسینی SEO", issuer: "هاوبشوێبی ناوەڕۆک", year: "٢٠٢١" }
      ]
    },
    contact: {
      title: "با پەیوەندیمان هەبێت",
      subtitle: "ئامادەیت بۆ بردنە قۆناغێکی تری کاروبارەکەت؟ لە سۆشیاڵ میدیاکانم نامەیەکم بۆ بنێرە.",
      social: {
        instagram: "لە ئینستاگرام لەگەڵم بە",
        telegram: "لە تێلیگرام نامەم بۆ بنێرە"
      },
      form: {
        name: "ناوت",
        email: "ئیمەیلت",
        message: "نامەکەت",
        submit: "ناردنی نامە"
      },
      whatsapp: "چات لە واتساپ"
    },
    common: {
      information: "زانیاری",
      features: "تایبەتمەندییەکان",
      whatIDo: "چ کارێک دەکەم",
      choosePlan: "هەڵبژاردنی پلان",
      findWithMe: "لەگەڵم بە",
      allRightsReserved: "هەموو مافەکان پارێزراون.",
      sent: "نێردرا!",
      messageSent: "نامەکە بە سەرکەوتوویی نێردرا!",
      messageFailed: "ناردنی نامەکە شکستی هێنا."
    }
  },
  ar: {
    nav: {
      services: "الخدمات",
      about: "نبذة عني",
      books: "الكتب",
      consulting: "الاستشارات",
      courses: "الدورات",
      faq: "الأسئلة الشائعة",
      certificates: "الشهادات",
      contact: "تواصل معي",
      admin: "لوحة القيادة"
    },
    hero: {
      name: "ژيلا",
      title: "كاتبة ومستشارة أعمال",
      tagline: "ارتقِ بعلامتك التجارية من خلال نصوص جذابة واستشارات استراتيجية.",
      cta: "اعمل معي"
    },
    about: {
      title: "من أنا",
      bio: "أنا كاتبة ومستشارة أعمال شغوفة، مكرسة لمساعدة العلامات التجارية في العثور على صوتها وتوصيل قيمتها بشكل فعال. مع سنوات من الخبرة في كتابة الإعلانات، والتخطيط الاستراتيجي، والعلامات التجارية الشخصية، أحول الأفكار المعقدة إلى روايات جذابة.",
      values: ["الوضوح قبل الذكاء", "سرد القصص الأصيلة", "التفكير الاستراتيجي", "نهج موجه نحو النتائج"]
    },
    services: {
      title: "خدمات العلامات التجارية",
      subtitle: "حلول مخصصة لتعزيز حضور علامتك التجارية.",
      items: [
        {
          title: "تطوير صوت العلامة التجارية",
          description: "إنشاء نبرة صوت فريدة ومتسقة لعلامتك التجارية عبر جميع القنوات."
        },
        {
          title: "كتابة نصوص المواقع",
          description: "نصوص جذابة وصديقة لمحركات البحث تحول الزوار إلى عملاء مخلصين."
        },
        {
          title: "استراتيجية المحتوى",
          description: "تخطيط شامل لضمان توافق المحتوى الخاص بك مع أهداف عملك."
        }
      ]
    },
    books: {
      title: "كتبي",
      subtitle: "أعمال منشورة لمساعدتك على إتقان كتابة الأعمال.",
      items: [
        {
          title: "فن كتابة الأعمال",
          status: "متوفر الآن"
        },
        {
          title: "التواصل الاستراتيجي",
          status: "قريباً"
        }
      ]
    },
    consulting: {
      title: "باقات الاستشارات",
      subtitle: "توجيه فردي لتسريع نموك.",
      items: [
        {
          title: "استراتيجية البداية",
          price: "$299",
          features: ["مكالمة استراتيجية لمدة ساعة", "تدقيق العلامة التجارية", "وثيقة خطة العمل"]
        },
        {
          title: "إصلاح شامل",
          price: "$899",
          features: ["3 جلسات استراتيجية", "دليل كامل لصوت العلامة التجارية", "مراجعة نصوص الموقع", "دعم لمدة 30 يومًا"]
        }
      ]
    },
    courses: {
      title: "دوراتي",
      subtitle: "تعلم بالسرعة التي تناسبك مع المحتوى التعليمي المنسق الخاص بي.",
      items: [
        {
          title: "إتقان كتابة الإعلانات في 30 يومًا",
          description: "دليل كامل لكتابة النصوص التي تبيع.",
          cta: "سجل الآن"
        },
        {
          title: "العلامات التجارية الشخصية للمستقلين",
          description: "ابنِ علامة تجارية تجذب العملاء ذوي الدفع المرتفع.",
          cta: "سجل الآن"
        }
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          question: "ما هي الصناعات التي تتخصص فيها؟",
          answer: "أعمل بشكل أساسي مع تكنولوجيا B2B، والخدمات المهنية، والعلامات التجارية الشخصية. ومع ذلك، يمكن تطبيق نهجي الاستراتيجي على أي صناعة تقريبًا."
        },
        {
          question: "كم من الوقت يستغرق المشروع النموذجي؟",
          answer: "يستغرق مشروع كتابة نصوص مواقع الويب القياسي حوالي 2-3 أسابيع، بينما يمكن أن تستمر ارتباطات الاستشارات الشاملة لمدة تصل إلى 3 أشهر."
        },
        {
          question: "هل تقدمون باقات مخصصة؟",
          answer: "نعم! إذا كنت لا ترى حزمة تناسب احتياجاتك الدقيقة، فتواصل معنا ويمكننا مناقشة اقتراح مخصص."
        }
      ]
    },
    certificates: {
      title: "الشهادات",
      subtitle: "مؤهلاتي وإنجازاتي المهنية.",
      items: [
        { title: "استراتيجية كتابة الإعلانات المتقدمة", issuer: "معهد التسويق", year: "2023" },
        { title: "دورة متقدمة في التواصل بين الشركات B2B", issuer: "أكاديمية الأعمال", year: "2022" },
        { title: "شهادة الكتابة لمحركات البحث", issuer: "منصة المحتوى", year: "2021" }
      ]
    },
    contact: {
      title: "لنتواصل",
      subtitle: "هل أنت مستعد لنقل عملك إلى المستوى التالي؟ أرسل لي رسالة على قنوات التواصل الاجتماعي الخاصة بي.",
      social: {
        instagram: "تابعني على انستغرام",
        telegram: "راسلني على تيليجرام"
      },
      form: {
        name: "اسمك",
        email: "بريدك الإلكتروني",
        message: "رسالتك",
        submit: "إرسال الرسالة"
      },
      whatsapp: "دردش عبر واتساب"
    },
    common: {
      information: "معلومات",
      features: "المميزات",
      whatIDo: "ما أفعله",
      choosePlan: "اختر خطة",
      findWithMe: "تواصل معي",
      allRightsReserved: "كل الحقوق محفوظة.",
      sent: "تم الإرسال!",
      messageSent: "تم إرسال الرسالة بنجاح!",
      messageFailed: "فشل إرسال الرسالة."
    }
  }
};
