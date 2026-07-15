export type Lang = "en" | "hi" | "mr" | "ta";

export type LocalizedText = {
  en: string;
  hi: string;
  mr: string;
  ta: string;
};

export type Tell = {
  label: LocalizedText;
  detail: LocalizedText;
};

export type Post = {
  id: string;
  handle: string;
  name: string;
  time: string;
  avatarTone: "sunny" | "tangerine" | "teal" | "forest" | "grape";
  kind: "text" | "photo" | "voice" | "video" | "screenshot";
  caption: LocalizedText;
  media?: LocalizedText;
  stats: { likes: number; shares: number; comments: number };
  fake: boolean;
  category: LocalizedText;
  tells: Tell[];
  verdict: LocalizedText;
  source?: LocalizedText;
};

export const POSTS: Post[] = [
  {
    id: "p1",
    handle: "@indore_updates24",
    name: "Indore Updates 24x7",
    time: "12m",
    avatarTone: "tangerine",
    kind: "screenshot",
    caption: {
      en: "BREAKING: Scholarship portal deadline moved to TONIGHT 11:59 PM. Forward to every student you know before the link closes!!",
      hi: "बड़ी खबर: स्कॉलरशिप पोर्टल की आखिरी तारीख आज रात 11:59 बजे तक कर दी गई है। लिंक बंद होने से पहले हर छात्र को भेजें!!",
      mr: "मोठी बातमी: स्कॉलरशिप पोर्टलची अंतिम मुदत आज रात्री ११:५९ पर्यंत वाढवली आहे. लिंक बंद होण्यापूर्वी सर्व विद्यार्थ्यांना पाठवा!!",
      ta: "முக்கிய செய்தி: கல்வி உதவித்தொகை போர்டல் கடைசி தேதி இன்று இரவு 11:59 மணிக்கு முடிவடைகிறது. லிங்க் மூடப்படுவதற்கு முன் அனைத்து மாணவர்களுக்கும் பகிருங்கள்!!",
    },
    media: {
      en: "Screenshot of a notice — logo slightly stretched, date font different from body text",
      hi: "नोटिस का स्क्रीनशॉट — लोगो थोड़ा खिंचा हुआ, तारीख का फॉन्ट बाकी टेक्स्ट से अलग",
      mr: "नोटीसचा स्क्रीनशॉट — लोगो थोडा ताणलेला, तारखेचा फॉन्ट इतर मजकुरापेक्षा वेगळा",
      ta: "அறிவிப்பின் ஸ்கிரீன்ஷாட் — லோகோ சற்றே நீட்டப்பட்டது, தேதி எழுத்துரு மற்ற உரையிலிருந்து வேறுபட்டது",
    },
    stats: { likes: 4210, shares: 9870, comments: 612 },
    fake: true,
    category: {
      en: "Forged notice",
      hi: "जाली सूचना",
      mr: "बनावट नोटीस",
      ta: "போலி அறிவிப்பு",
    },
    tells: [
      {
        label: {
          en: "Urgency you can't verify",
          hi: "ऐसी जल्दबाज़ी जो जाँची न जा सके",
          mr: "पडताळता न येणारी घाई",
          ta: "சரிபார்க்க முடியாத அவசரம்",
        },
        detail: {
          en: "Real deadline changes are announced days ahead, not hours. 'Before the link closes' exists to stop you checking.",
          hi: "असली तारीख़ बदलने की सूचना घंटों नहीं, दिनों पहले आती है। 'लिंक बंद होने से पहले' लिखा ही इसलिए है कि आप जाँच न करें।",
          mr: "मुदत वाढीच्या खऱ्या बातम्या काही दिवस आधी जाहीर होतात. 'लिंक बंद होण्यापूर्वी' हा मजकूर तुम्हाला पडताळणी करण्यापासून रोखण्यासाठी आहे.",
          ta: "உண்மையான கடைசி தேதி மாற்றங்கள் சில நாட்களுக்கு முன்பே அறிவிக்கப்படும். 'லிங்க் மூடப்படுவதற்கு முன்' என்பது நீங்கள் சரிபார்ப்பதைத் தடுக்கவே உள்ளது.",
        },
      },
      {
        label: {
          en: "Mismatched typography",
          hi: "फॉन्ट का मेल न खाना",
          mr: "फॉन्टमध्ये तफावत",
          ta: "பொருந்தாத எழுத்துரு",
        },
        detail: {
          en: "The date sits in a different font weight than the rest of the notice — the classic sign of an edited screenshot.",
          hi: "तारीख़ का फॉन्ट बाकी नोटिस से अलग है — एडिट किए गए स्क्रीनशॉट की सबसे आम पहचान।",
          mr: "तारखेचा फॉन्ट नोटीसमधील इतर फॉन्टपेक्षा वेगळा आहे — हा एडिट केलेल्या स्क्रीनशॉटचा सर्वात मोठा पुरावा आहे.",
          ta: "தேதியின் எழுத்துரு அறிவிப்பின் மற்ற பகுதிகளை விட வித்தியாசமாக உள்ளது — இது திருத்தப்பட்ட ஸ்கிரீன்ஷாட்டின் அடையாளம்.",
        },
      },
      {
        label: {
          en: "No official handle",
          hi: "कोई आधिकारिक हैंडल नहीं",
          mr: "अधिकृत हँडल नाही",
          ta: "அதிகாரப்பூர்வ பக்கம் இல்லை",
        },
        detail: {
          en: "A district 'updates' page is not the issuing authority. The notice names no department and links to no .gov.in page.",
          hi: "कोई 'अपडेट्स' पेज जारीकर्ता संस्था नहीं होती। नोटिस में न विभाग का नाम है, न कोई .gov.in लिंक।",
          mr: "कोणतेही 'अपडेट्स' पेज अधिकृत संस्था नसते. नोटीसमध्ये विभागाचे नाव किंवा .gov.in लिंक नाही.",
          ta: "ஒரு 'அப்டேட்ஸ்' பக்கம் அதிகாரப்பூர்வ அமைப்பு அல்ல. அறிவிப்பில் துறை பெயர் அல்லது .gov.in இணைப்பு இல்லை.",
        },
      },
    ],
    verdict: {
      en: "Forged notice. The original deadline never moved.",
      hi: "जाली सूचना। असली तारीख़ कभी बदली ही नहीं।",
      mr: "बनावट नोटीस. मूळ मुदत कधीही बदलली नव्हती.",
      ta: "போலி அறிவிப்பு. உண்மையான கடைசி தேதி ஒருபோதும் மாறவில்லை.",
    },
    source: {
      en: "Check: the issuing department's own site or helpline before forwarding.",
      hi: "जाँचें: फॉरवर्ड करने से पहले विभाग की अपनी वेबसाइट या हेल्पलाइन।",
      mr: "फॉरवर्ड करण्यापूर्वी संबंधित विभागाची अधिकृत वेबसाईट किंवा हेल्पलाइन तपासा.",
      ta: "பகிரும் முன் துறைசார்ந்த அதிகாரப்பூர்வ இணையதளம் அல்லது உதவி எண்ணை சரிபார்க்கவும்.",
    },
  },
  {
    id: "p2",
    handle: "@meera.reads",
    name: "Meera Kulkarni",
    time: "38m",
    avatarTone: "teal",
    kind: "photo",
    caption: {
      en: "Finally finished the community library shelf we've been building for three weekends. Kids picked the colours.",
      hi: "तीन हफ़्तों से बन रही कम्युनिटी लाइब्रेरी की शेल्फ आख़िरकार पूरी हुई। रंग बच्चों ने चुने।",
      mr: "तीन आठवड्यांपासून बनवत असलेले कम्युनिटी लायब्ररीचे कपाट अखेर पूर्ण झाले! रंग मुलांनी निवडले.",
      ta: "மூன்று வாரங்களாக உருவாக்கி வந்த சமூக நூலக அலமாரி இறுதியாக முடிந்தது. குழந்தைகள் வண்ணங்களைத் தேர்ந்தெடுத்தனர்.",
    },
    media: {
      en: "Photo of a hand-painted bookshelf, natural light, visible brush marks",
      hi: "हाथ से रंगी किताबों की शेल्फ की तस्वीर, प्राकृतिक रोशनी, ब्रश के निशान दिखते हुए",
      mr: "हाताने रंगवलेल्या पुस्तकांच्या कपाटाचा फोटो, नैसर्गिक प्रकाश, ब्रशचे डाग दिसतात",
      ta: "கையால் வண்ணம் தீட்டப்பட்ட புத்தக அலமாரியின் புகைப்படம், இயற்கை ஒளி, தூரிகை அடையாளங்கள் தெரிகின்றன",
    },
    stats: { likes: 128, shares: 6, comments: 21 },
    fake: false,
    category: {
      en: "Ordinary, true",
      hi: "साधारण, सच",
      mr: "साधे, खरे",
      ta: "இயல்பான, உண்மையான",
    },
    tells: [],
    verdict: {
      en: "Genuine. Specific, checkable, and asks nothing of you.",
      hi: "असली। ठोस, जाँचने योग्य, और आपसे कुछ माँगता नहीं।",
      mr: "खरे. स्पष्ट, पडताळणीयोग्य आणि तुमच्याकडून काहीही मागत नाही.",
      ta: "உண்மையானது. குறிப்பிட்டது, சரிபார்க்கக்கூடியது, உங்களிடம் எதையும் கேட்கவில்லை.",
    },
  },
  {
    id: "p3",
    handle: "@voicenote_forward",
    name: "Family Group Forward",
    time: "1h",
    avatarTone: "grape",
    kind: "voice",
    caption: {
      en: "Voice note from a 'senior doctor': stop taking your prescribed tablets, this kitchen remedy clears it in 3 days. 2:14",
      hi: "एक 'वरिष्ठ डॉक्टर' का वॉइस नोट: अपनी दवाइयाँ बंद कर दें, यह घरेलू नुस्खा 3 दिन में ठीक कर देगा। 2:14",
      mr: "एका 'ज्येष्ठ डॉक्टरांचा' व्हॉईस टीप: औषधे घेणे थांबवा, हा घरगुती उपाय ३ दिवसांत आजार बरा करतो. २:१४",
      ta: "ஒரு 'மூத்த மருத்துவரிடமிருந்து' குரல் பதிவு: மாத்திரைகளை நிறுத்துங்கள், இந்த வீட்டு மருத்துவம் 3 நாட்களில் குணமாக்கும். 2:14",
    },
    media: {
      en: "Audio waveform — breath gaps are perfectly even, sentence ends flatten identically",
      hi: "ऑडियो वेवफॉर्म — साँस के अंतराल बिल्कुल बराबर, हर वाक्य का अंत एक जैसा सपाट",
      mr: "ऑडिओ वेव्हफॉर्म — श्वासातील अंतर अगदी समान, प्रत्येक वाक्याचा शेवट एकसारखा सपाट",
      ta: "ஆடியோ அலைவடிவம் — மூச்சு இடைவெளிகள் கச்சிதமாக சீராக உள்ளன, வாக்கியங்களின் முடிவுகள் ஒரே மாதிரியாக உள்ளன",
    },
    stats: { likes: 1902, shares: 15400, comments: 233 },
    fake: true,
    category: {
      en: "Cloned voice / health harm",
      hi: "क्लोन आवाज़ / स्वास्थ्य जोखिम",
      mr: "क्लोन केलेला आवाज / आरोग्य धोके",
      ta: "குரல் குளோனிங் / சுகாதார ஆபத்து",
    },
    tells: [
      {
        label: {
          en: "Unnaturally even breathing",
          hi: "अस्वाभाविक रूप से एक जैसी साँसें",
          mr: "अस्वाभाविकपणे समान श्वासोच्छ्वास",
          ta: "இயற்கைக்கு மாறான சீரான மூச்சு",
        },
        detail: {
          en: "Human speech breathes irregularly. Synthetic speech spaces its pauses on a grid — listen for the metronome.",
          hi: "इंसानी बोली की साँसें असमान होती हैं। सिंथेटिक आवाज़ के ठहराव एक ही ताल पर होते हैं — मेट्रोनोम की तरह।",
          mr: "माणसाच्या बोलण्यात श्वास अनियमित असतो. कृत्रिम आवाजातील विराम घड्याळाच्या काट्यासारखे अगदी नियमित असतात.",
          ta: "மனித பேச்சில் மூச்சு சீரற்றது. செயற்கை குரல் இடைவெளிகள் சீரான கால அளவில் இருக்கும்.",
        },
      },
      {
        label: {
          en: "Flat sentence tails",
          hi: "वाक्य के अंत का सपाट होना",
          mr: "वाक्याचा शेवट सपाट होणे",
          ta: "வாக்கிய முடிவில் உணர்ச்சியின்மை",
        },
        detail: {
          en: "Every sentence lands on the same falling tone. Real speakers vary their endings with emotion.",
          hi: "हर वाक्य एक ही गिरते सुर पर खत्म होता है। असली वक्ता भाव के साथ अंत बदलते हैं।",
          mr: "प्रत्येक वाक्य एकाच सपाट सुरावर संपते. खरे बोलणारे भावनेनुसार आवाज बदलतात.",
          ta: "ஒவ்வொரு வாக்கியமும் ஒரே மாதிரியான தாழ்ந்த தொனியில் முடிகிறது. உண்மையான மனிதர்கள் உணர்ச்சிக்கேற்ப தொனியை மாற்றுவார்கள்.",
        },
      },
      {
        label: {
          en: "Anonymous authority",
          hi: "बेनाम विशेषज्ञता",
          mr: "अनामित तज्ज्ञ",
          ta: "பெயரில்லாத அதிகாரப்பூர்வ நபர்",
        },
        detail: {
          en: "'A senior doctor' with no name, hospital or registration number is not a source — it's a costume.",
          hi: "बिना नाम, अस्पताल या रजिस्ट्रेशन नंबर वाला 'वरिष्ठ डॉक्टर' स्रोत नहीं, एक भेस है।",
          mr: "नाव, रुग्णालय किंवा नोंदणी क्रमांकाशिवाय 'ज्येष्ठ डॉक्टर' हा पुरावा नसून एक बनाव आहे.",
          ta: "பெயர், மருத்துவமனை அல்லது பதிவு எண் இல்லாத 'மூத்த மருத்துவர்' ஒரு ஆதாரமல்ல.",
        },
      },
    ],
    verdict: {
      en: "Cloned voice. Advice like this has put people in hospital.",
      hi: "क्लोन की गई आवाज़। ऐसी सलाह लोगों को अस्पताल पहुँचा चुकी है।",
      mr: "क्लोन केलेला आवाज. अशा सल्ल्यांमुळे अनेक लोक रुग्णालयात दाखल झाले आहेत.",
      ta: "குளோன் செய்யப்பட்ட குரல். இத்தகைய தவறான ஆலோசனைகள் மக்களை மருத்துவமனையில் சேர்த்துள்ளன.",
    },
    source: {
      en: "Never stop prescribed medication on a forward. Ask the prescribing doctor.",
      hi: "किसी फॉरवर्ड पर दवा बंद न करें। अपने डॉक्टर से पूछें।",
      mr: "फॉरवर्ड मेसेज पाहून औषधे थांबवू नका. तुमच्या डॉक्टरांचा सल्ला घ्या.",
      ta: "பகிரப்படும் செய்தியை நம்பி மருந்துகளை நிறுத்தாதீர்கள். உங்கள் மருத்துவரிடம் கேளுங்கள்.",
    },
  },
  {
    id: "p4",
    handle: "@cityweatherwatch",
    name: "City Weather Watch",
    time: "2h",
    avatarTone: "forest",
    kind: "text",
    caption: {
      en: "Orange alert for heavy rain in the district tomorrow, 6 AM to noon. Issued by the regional met centre; bulletin number and timestamp in the thread.",
      hi: "कल सुबह 6 से दोपहर तक ज़िले में भारी बारिश का ऑरेंज अलर्ट। क्षेत्रीय मौसम केंद्र द्वारा जारी; बुलेटिन नंबर और समय थ्रेड में।",
      mr: "उद्या सकाळी ६ ते दुपारी जिल्ह्यात मुसळधार पावसाचा ऑरेंज अलर्ट. प्रादेशिक हवामान केंद्राने जारी केले; बुलेटीन क्रमांक आणि वेळ थ्रेडमध्ये.",
      ta: "நாளை காலை 6 மணி முதல் மதியம் வரை மாவட்டத்தில் பலத்த மழைக்கான ஆரஞ்சு எச்சரிக்கை. பிராந்திய வானிலை மையத்தால் வெளியிடப்பட்டது; செய்தி எண் மற்றும் நேரம் த்ரெட்டில்.",
    },
    stats: { likes: 806, shares: 410, comments: 57 },
    fake: false,
    category: {
      en: "Sourced, true",
      hi: "स्रोत सहित, सच",
      mr: "संदर्भासहित, खरे",
      ta: "ஆதாரத்துடன், உண்மையானது",
    },
    tells: [],
    verdict: {
      en: "Genuine. Names the issuer, the window, and a bulletin you can look up.",
      hi: "असली। जारीकर्ता, समय और बुलेटिन नंबर — सब जाँचा जा सकता है।",
      mr: "खरे. जारी करणारी संस्था, वेळ आणि बुलेटीन क्रमांक दिलेला आहे.",
      ta: "உண்மையானது. வெளியிட்டவர், நேரம் மற்றும் சரிபார்க்கக்கூடிய செய்தி எண் வழங்கப்பட்டுள்ளது.",
    },
  },
  {
    id: "p5",
    handle: "@realtalk.clips",
    name: "RealTalk Clips",
    time: "3h",
    avatarTone: "sunny",
    kind: "video",
    caption: {
      en: "A well-known minister 'admits' on camera that a state exam was cancelled. 14 second clip, no start, no end.",
      hi: "एक जाने-माने मंत्री कैमरे पर 'मानते' हैं कि राज्य की परीक्षा रद्द हो गई। 14 सेकंड की क्लिप, न शुरुआत, न अंत।",
      mr: "एका प्रसिद्ध मंत्र्यांनी कॅमेऱ्यावर राज्य परीक्षा रद्द झाल्याचे 'मान्य केले'. १४ सेकंदांची क्लिप, सुरुवात नाही, शेवट नाही.",
      ta: "ஒரு பிரபல அமைச்சர் மாநிலத் தேர்வு ரத்து செய்யப்பட்டதாக கேமராவில் 'ஒப்புக்கொள்கிறார்'. 14 வினாடி வீடியோ, தொடக்கமும் முடிவும் இல்லை.",
    },
    media: {
      en: "Video still — lip edges blur on plosive sounds, jawline shimmers when the head turns",
      hi: "वीडियो फ़्रेम — 'प' जैसे अक्षरों पर होंठों के किनारे धुंधले, सिर घुमाते ही जबड़े की रेखा हिलती हुई",
      mr: "व्हिडिओ स्टिल — 'प' सारख्या अक्षरांवर ओठांच्या कडा अस्पष्ट, मान हलवताना जबड्याची रेष हलते",
      ta: "வீடியோ ஃபிரேம் — உதடுகளின் அசைவு வார்த்தைகளுடன் பொருந்தவில்லை, தலை திரும்பும்போது தாடை பகுதி மங்கலாகிறது",
    },
    stats: { likes: 22400, shares: 41200, comments: 3100 },
    fake: true,
    category: {
      en: "Deepfake video",
      hi: "डीपफ़ेक वीडियो",
      mr: "डीपफेक व्हिडिओ",
      ta: "டீப்ஃபேக் வீடியோ",
    },
    tells: [
      {
        label: {
          en: "Lip-sync breaks on hard sounds",
          hi: "कठोर ध्वनियों पर होंठ मेल नहीं खाते",
          mr: "कठीण शब्दांवर ओठांची हालचाल जुळत नाही",
          ta: "கடின ஒலிகளில் உதட்டு அசைவு பொருந்தவில்லை",
        },
        detail: {
          en: "Face-swap models struggle with p/b/m closures. Freeze the frame on those sounds and the mouth smears.",
          hi: "फेस-स्वैप मॉडल प/ब/म पर अटकते हैं। उन ध्वनियों पर फ़्रेम रोकिए, मुँह फैला हुआ दिखेगा।",
          mr: "फेस-स्वॅप मॉडेल p/b/m उच्चारांवर अडखळतात. तिथे व्हिडिओ थांबवल्यास तोंड पसरलेले दिसेल.",
          ta: "ஃபேஸ்-ஸ்வாப் மாடல்கள் p/b/m ஒலிகளில் தடுமாறும். அந்த ஒலிகளில் வீடியோவை நிறுத்திப் பார்த்தால் உதடு மங்கலாகத் தெரியும்.",
        },
      },
      {
        label: {
          en: "Clipped with no context",
          hi: "बिना संदर्भ की कटी क्लिप",
          mr: "संदर्भ नसलेली कापलेली क्लिप",
          ta: "முழு பின்னணியும் இல்லாத சிறிய வீடியோ",
        },
        detail: {
          en: "14 seconds with no before or after. Ask for the full recording — it almost never exists.",
          hi: "14 सेकंड, न पहले का कुछ, न बाद का। पूरी रिकॉर्डिंग माँगिए — वह अक्सर होती ही नहीं।",
          mr: "आधीचे किंवा नंतरचे काहीही न दाखवता १४ सेकंद. पूर्ण व्हिडिओ मागितल्यास तो नसतोच.",
          ta: "முந்தைய அல்லது பிந்தைய பகுதிகள் இல்லாத 14 வினாடிகள் மட்டுமே. முழு வீடியோவைக் கேட்டால் அது இருக்கவே இருக்காது.",
        },
      },
      {
        label: {
          en: "Emotionally perfect",
          hi: "भावनात्मक रूप से एकदम फ़िट",
          mr: "भावनिकदृष्ट्या अचूक",
          ta: "உணர்ச்சிப்பூர்வமாக தூண்டும் வடிவம்",
        },
        detail: {
          en: "It says exactly what its audience already wants to hear. That fit is a warning, not proof.",
          hi: "यह ठीक वही कहता है जो दर्शक सुनना चाहते हैं। यह मेल सबूत नहीं, चेतावनी है।",
          mr: "हे प्रेक्षकांना जे ऐकायचे आहे तेच सांगते. हा सुमेळ पुरावा नसून इशारा आहे.",
          ta: "பார்வையாளர்கள் எதை எதிர்பார்க்கிறார்களோ அதை கச்சிதமாக சொல்கிறது. இது எச்சரிக்கையே தவிர ஆதாரமல்ல.",
        },
      },
    ],
    verdict: {
      en: "Deepfake. The exam schedule was never changed.",
      hi: "डीपफ़ेक। परीक्षा का कार्यक्रम कभी बदला ही नहीं।",
      mr: "डीपफेक. परीक्षेचे वेळापत्रक कधीही बदलले नाही.",
      ta: "டீப்ஃபேக். தேர்வு அட்டவணை மாறவே இல்லை.",
    },
    source: {
      en: "Search the quote in text. A real statement leaves a paper trail within hours.",
      hi: "बयान को टेक्स्ट में खोजें। असली बयान घंटों में रिकॉर्ड पर आ जाता है।",
      mr: "हे विधान गुगलवर शोधा. खरे विधान तासाभरात अधिकृत बातम्यांमध्ये येते.",
      ta: "இந்த உரையை கூகிளில் தேடவும். உண்மையான அறிக்கை சில மணிநேரங்களில் செய்திகளில் வரும்.",
    },
  },
  {
    id: "p6",
    handle: "@quickcash_offers",
    name: "QuickCash Offers",
    time: "4h",
    avatarTone: "tangerine",
    kind: "photo",
    caption: {
      en: "Govt is giving Rs 5,000 to every student. Only 200 slots left. Click, enter your UPI PIN to receive.",
      hi: "सरकार हर छात्र को 5,000 रुपये दे रही है। सिर्फ़ 200 स्लॉट बचे। क्लिक करें, पाने के लिए UPI पिन डालें।",
      mr: "शासन प्रत्येक विद्यार्थ्याला ₹५,००० देत आहे. फक्त २०० जागा शिल्लक. मिळवण्यासाठी क्लिक करा व UPI पिन टाका.",
      ta: "அரசு ஒவ்வொரு மாணவருக்கும் ₹5,000 வழங்குகிறது. 200 இடங்கள் மட்டுமே மீதம். பெற உங்கள் UPI PIN ஐ உள்ளிடவும்.",
    },
    media: {
      en: "Bright banner with a national emblem placed off-centre and low resolution",
      hi: "चमकीला बैनर जिस पर राष्ट्रीय चिह्न टेढ़ा और कम रिज़ॉल्यूशन में लगा है",
      mr: "राष्ट्रीय चिन्ह वाकडे आणि अस्पष्ट असलेला चमकणारा बॅनर",
      ta: "தேசிய இலச்சினை சாய்வாகவும் மங்கலாகவும் உள்ள பேனர்",
    },
    stats: { likes: 7300, shares: 18900, comments: 1420 },
    fake: true,
    category: {
      en: "Financial scam",
      hi: "वित्तीय ठगी",
      mr: "आर्थिक फसवणूक",
      ta: "நிதி மோசடி",
    },
    tells: [
      {
        label: {
          en: "A PIN never receives money",
          hi: "पिन से पैसे कभी नहीं मिलते",
          mr: "पिन टाकून पैसे मिळत नाहीत",
          ta: "பணம் பெற PIN தேவையில்லை",
        },
        detail: {
          en: "Entering a UPI PIN authorises a payment out of your account. Receiving money never requires one.",
          hi: "UPI पिन डालने से पैसे आपके खाते से जाते हैं। पैसे लेने के लिए पिन कभी नहीं लगता।",
          mr: "UPI पिन टाकल्यास तुमच्या खात्यातून पैसे कट होतात. पैसे मिळण्यासाठी पिनची गरज नसते.",
          ta: "UPI PIN ஐ உள்ளீடு செய்தால் உங்கள் கணக்கிலிருந்து பணம் கழிக்கப்படும். பணம் பெற PIN தேவையில்லை.",
        },
      },
      {
        label: {
          en: "Manufactured scarcity",
          hi: "बनावटी कमी",
          mr: "कृत्रिम टंचाई",
          ta: "செயற்கையான அவசரம்",
        },
        detail: {
          en: "'200 slots left' is a countdown on your judgement, not on a real scheme.",
          hi: "'200 स्लॉट बचे' किसी योजना की नहीं, आपकी सोच की उलटी गिनती है।",
          mr: "'फक्त २०० जागा शिल्लक' हा तुम्हाला विचार न करू देण्याचा प्रयत्न आहे.",
          ta: "'200 இடங்கள் மட்டுமே உள்ளன' என்பது உங்களை சிந்திக்க விடாமல் அவசரப்படுத்தும் தந்திரம்.",
        },
      },
      {
        label: {
          en: "Misused emblem",
          hi: "चिह्न का दुरुपयोग",
          mr: "राष्ट्रीय चिन्हाचा गैरवापर",
          ta: "இலச்சினை தவறாகப் பயன்படுத்தப்படுதல்",
        },
        detail: {
          en: "Official material uses the emblem to fixed specifications. Stretched, blurry or off-centre means copied.",
          hi: "सरकारी सामग्री में चिह्न तय मानकों से लगता है। खिंचा, धुंधला या टेढ़ा मतलब नकल।",
          mr: "शासकीय कामात चिन्ह नियमानुसार वापरले जाते. अस्पष्ट किंवा वाकडे चिन्ह म्हणजे बनावटपणा.",
          ta: "அதிகாரப்பூர்வ ஆவணங்களில் இலச்சினை சரியாக இருக்கும். மங்கலான அல்லது சாய்வான இலச்சினை போலியானது.",
        },
      },
    ],
    verdict: {
      en: "Scam. This template drains accounts every single week.",
      hi: "ठगी। यही टेम्पलेट हर हफ़्ते खाते खाली करता है।",
      mr: "फसवणूक! हा टेम्पलेट दर आठवड्याला लोकांचे बँक खाते रिकामे करतो.",
      ta: "மோசடி. இந்த மெசேஜ் மூலம் ஒவ்வொரு வாரமும் மக்களின் பணம் கொள்ளையடிக்கப்படுகிறது.",
    },
    source: {
      en: "Report to 1930 (cyber crime helpline) instead of forwarding.",
      hi: "फॉरवर्ड करने की जगह 1930 (साइबर क्राइम हेल्पलाइन) पर शिकायत करें।",
      mr: "फॉरवर्ड करण्याऐवजी १९३० (सायबर तक्रार हेल्पलाइन) वर संपर्क साधा.",
      ta: "பகிர்வதற்குப் பதிலாக 1930 (சைபர் கிரைம் உதவி எண்) இல் புகாரளிக்கவும்.",
    },
  },
  {
    id: "p7",
    handle: "@arjun.builds",
    name: "Arjun Deshpande",
    time: "5h",
    avatarTone: "grape",
    kind: "text",
    caption: {
      en: "Took me four tries to get the ward-level data out of the municipal PDF. Sharing the cleaned sheet and my method so you can check my working.",
      hi: "नगर निगम की PDF से वार्ड-स्तर का डेटा निकालने में चार बार कोशिश करनी पड़ी। साफ़ की हुई शीट और तरीका दोनों साझा कर रहा हूँ, ताकि आप जाँच सकें।",
      mr: "महानगरपालिकेच्या PDF मधून प्रभागनिहाय माहिती काढायला ४ प्रयत्न लागले. डेटा शीट आणि पद्धत शेअर करत आहे जेणेकरून तुम्ही तपासू शकाल.",
      ta: "மாநகராட்சி PDF இலிருந்து வார்டு அளவிலான தரவை எடுக்க நான்கு முயற்சிகள் எடுத்தன. சரிபார்க்க முறையையும் தரவையும் பகிர்ந்துள்ளேன்.",
    },
    stats: { likes: 344, shares: 88, comments: 40 },
    fake: false,
    category: {
      en: "Shows its working",
      hi: "अपना तरीका दिखाता है",
      mr: "कामाची पद्धत दाखवते",
      ta: "செயல்முறையை வெளிப்படையாகக் காட்டுகிறது",
    },
    tells: [],
    verdict: {
      en: "Genuine. Publishes the method, invites correction.",
      hi: "असली। तरीका बताता है, सुधार का न्योता देता है।",
      mr: "खरे. कार्यपद्धती स्पष्ट सांगून दुरुस्तीचे स्वागत करते.",
      ta: "உண்மையானது. முறையை வெளியிட்டு, திருத்தங்களை வரவேற்கிறது.",
    },
  },
  {
    id: "p8",
    handle: "@bharat_sanskriti_daily",
    name: "Bharat Sanskriti Daily",
    time: "7h",
    avatarTone: "forest",
    kind: "photo",
    caption: {
      en: "Photo 'from yesterday's rally in our city' — crowd of two lakh. Share to show the real numbers the media hid!",
      hi: "'कल हमारे शहर की रैली' की तस्वीर — दो लाख की भीड़। मीडिया ने जो छिपाया, वो असली आँकड़ा दिखाने के लिए शेयर करें!",
      mr: "'काल आपल्या शहरातील रॅलीचा' फोटो — २ लाखांची गर्दी. मीडियाने लपवलेली खरी आकडेवारी दाखवण्यासाठी शेअर करा!",
      ta: "'நேற்றைய பேரணியின்' புகைப்படம் — 2 லட்சம் மக்கள் கூட்டம். ஊடகங்கள் மறைத்த உண்மையை காட்ட பகிருங்கள்!",
    },
    media: {
      en: "Aerial crowd photo — signage in the background is in a different script; shadows point two ways",
      hi: "भीड़ की हवाई तस्वीर — पीछे के बोर्ड किसी और लिपि में; परछाइयाँ दो दिशाओं में",
      mr: "गर्दीचा फोटो — पार्श्वभूमीतील पाट्या दुसऱ्याच भाषेतील; सावल्या दोन वेगवेगळ्या दिशांना",
      ta: "கூட்டத்தின் வான்வழி புகைப்படம் — பின்னணியில் உள்ள பலகைகள் வேறு மொழியில் உள்ளன; நிழல்கள் இரு திசைகளில் உள்ளன",
    },
    stats: { likes: 15600, shares: 26700, comments: 2050 },
    fake: true,
    category: {
      en: "Old photo, new claim",
      hi: "पुरानी तस्वीर, नया दावा",
      mr: "जुना फोटो, नवीन दावा",
      ta: "பழைய புகைப்படம், புதிய செய்தி",
    },
    tells: [
      {
        label: {
          en: "Background doesn't match the place",
          hi: "पृष्ठभूमि जगह से मेल नहीं खाती",
          mr: "पार्श्वभूमी ठिकाणाशी जुळत नाही",
          ta: "பின்னணி இடத்திற்கு பொருந்தவில்லை",
        },
        detail: {
          en: "Signboards in another script mean another city — often another country, often years ago.",
          hi: "किसी और लिपि के बोर्ड यानी कोई और शहर — अक्सर कोई और देश, अक्सर बरसों पुराना।",
          mr: "दुसऱ्या भाषेतील बोर्ड म्हणजे फोटो दुसऱ्या शहराचा किंवा देशाचा आणि जुना असू शकतो.",
          ta: "வேறு மொழி பலகைகள் என்பது வேறு நகரம் அல்லது வேறு நாடு மற்றும் பழைய படம் என்பதைக் குறிக்கிறது.",
        },
      },
      {
        label: {
          en: "Inconsistent shadows",
          hi: "बेमेल परछाइयाँ",
          mr: "विसंगत सावल्या",
          ta: "பொருந்தாத நிழல்கள்",
        },
        detail: {
          en: "One sun makes one shadow direction. Two directions means two images stitched together.",
          hi: "एक सूरज एक ही दिशा में परछाईं बनाता है। दो दिशाएँ यानी दो तस्वीरें जोड़ी गई हैं।",
          mr: "एका सूर्यामुळे सावली एकाच दिशेला पडते. दोन दिशा म्हणजे दोन फोटो एकत्र जोडले आहेत.",
          ta: "ஒரு சூரியன் ஒரு திசையிலேயே நிழலை உருவாக்கும். இரு திசைகள் என்றால் இரண்டு படங்கள் இணைக்கப்பட்டுள்ளன.",
        },
      },
      {
        label: {
          en: "'The media hid this'",
          hi: "'मीडिया ने छिपाया'",
          mr: "'मीडियाने लपवले'",
          ta: "'ஊடகங்கள் மறைத்தன'",
        },
        detail: {
          en: "Pre-loading distrust is how a claim survives without evidence. Reverse image search takes nine seconds.",
          hi: "पहले से अविश्वास भरना ही वह तरीका है जिससे बिना सबूत दावा टिकता है। रिवर्स इमेज सर्च नौ सेकंड लेता है।",
          mr: "अविश्वास निर्माण करून पुरावा नसलेला दावा पसरवला जातो. रिव्हर्स इमेज सर्चला फक्त ९ सेकंद लागतात.",
          ta: "சந்தேகத்தை தூண்டி ஆதாரமற்ற செய்தியை பரப்புகிறார்கள். கூகிள் ரிவர்ஸ் இமேஜ் தேடலுக்கு 9 வினாடிகளே ஆகும்.",
        },
      },
    ],
    verdict: {
      en: "Recycled photo. Same image has circulated for years under different claims.",
      hi: "पुरानी तस्वीर। यही फ़ोटो सालों से अलग-अलग दावों के साथ घूम रही है।",
      mr: "रीसायकल केलेला फोटो. हाच फोटो गेली अनेक वर्षे वेगवेगळ्या दाव्यांसह फिरत आहे.",
      ta: "பழைய புகைப்படம். இதே புகைப்படம் பல வருடங்களாக வெவ்வேறு செய்திகளுடன் பரவி வருகிறது.",
    },
    source: {
      en: "Long-press the image and reverse search before you believe the number.",
      hi: "आँकड़े पर यक़ीन करने से पहले तस्वीर पर लॉन्ग-प्रेस कर रिवर्स सर्च करें।",
      mr: "आकड्यांवर विश्वास ठेवण्यापूर्वी फोटोवर लाँग-प्रेस करून रिव्हर्स सर्च करा.",
      ta: "செய்தியை நம்பும் முன் புகைப்படத்தை அழுத்தி கூகிளில் தேடி சரிபார்க்கவும்.",
    },
  },
  {
    id: "p9",
    handle: "@ai_future_now",
    name: "AI Future Now",
    time: "9h",
    avatarTone: "teal",
    kind: "screenshot",
    caption: {
      en: "'Leaked' internal memo: your phone camera is being switched on at night for training data. Screenshot before it gets deleted!",
      hi: "'लीक' आंतरिक मेमो: रात में आपके फ़ोन का कैमरा ट्रेनिंग डेटा के लिए चालू किया जा रहा है। हटने से पहले स्क्रीनशॉट ले लें!",
      mr: "'लीक' झालेली नोटीस: रात्री तुमचा फोन कॅमेरा ऑन केला जातो. डिलीट होण्यापूर्वी स्क्रीनशॉट घ्या!",
      ta: "'கசிந்த' உள் குறிப்பு: இரவில் உங்கள் போன் கேமரா இயக்கப்படுகிறது. நீக்கப்படுவதற்கு முன் ஸ்கிரீன்ஷாட் எடுக்கவும்!",
    },
    media: {
      en: "Plain-text 'memo' with no letterhead, no names, no dates",
      hi: "सादा टेक्स्ट 'मेमो' — न लेटरहेड, न नाम, न तारीख़",
      mr: "साधा मजकूर — लेटरहेड नाही, नाव नाही, तारीख नाही",
      ta: "சாதாரண உரை — லெட்டர்ஹெட் இல்லை, பெயர்கள் இல்லை, தேதிகள் இல்லை",
    },
    stats: { likes: 9800, shares: 12300, comments: 1870 },
    fake: true,
    category: {
      en: "Fabricated leak",
      hi: "गढ़ा हुआ लीक",
      mr: "बनावट लीक",
      ta: "ஜோடிக்கப்பட்ட செய்தி",
    },
    tells: [
      {
        label: {
          en: "'Screenshot before it's deleted'",
          hi: "'हटने से पहले स्क्रीनशॉट लें'",
          mr: "'डिलीट होण्यापूर्वी स्क्रीनशॉट घ्या'",
          ta: "'நீக்கப்படுவதற்கு முன் ஸ்கிரீன்ஷாட் எடுக்கவும்'",
        },
        detail: {
          en: "This line converts your suspicion into speed. Real leaks are reported, not chain-forwarded.",
          hi: "यह पंक्ति आपके शक को जल्दबाज़ी में बदल देती है। असली लीक रिपोर्ट होते हैं, चेन में नहीं घूमते।",
          mr: "हे वाक्य तुम्हाला घाई करायला लावते. खरे मेसेज फॉरवर्ड करण्याऐवजी बातमी म्हणून समोर येतात.",
          ta: "இந்த வரி உங்களை அவசரப்பட வைக்கும். உண்மையான தகவல்கள் செய்திகளாக வரும், மெசேஜாக பரவாது.",
        },
      },
      {
        label: {
          en: "No verifiable artefacts",
          hi: "कोई जाँचने योग्य निशान नहीं",
          mr: "तपासण्यायोग्य पुरावा नाही",
          ta: "சரிபார்க்கக்கூடிய ஆதாரங்கள் இல்லை",
        },
        detail: {
          en: "No sender, no recipient, no document ID. A memo without provenance is just typing.",
          hi: "न भेजने वाला, न पाने वाला, न दस्तावेज़ नंबर। बिना स्रोत का मेमो सिर्फ़ टाइपिंग है।",
          mr: "पाठवणारा नाही, स्वीकारणारा नाही, दस्तऐवज क्रमांक नाही. हा केवळ एक टाईप केलेला मेसेज आहे.",
          ta: "அனுப்புநர் இல்லை, பெறுநர் இல்லை, ஆவண எண் இல்லை. ஆதாரமில்லாத குறிப்பு வெறும் தட்டச்சு மட்டுமே.",
        },
      },
    ],
    verdict: {
      en: "Fabricated. No such memo, no such capability described anywhere credible.",
      hi: "गढ़ा हुआ। न ऐसा मेमो है, न ऐसी कोई पुष्ट क्षमता।",
      mr: "बनावट! असा कोणताही मेमो किंवा प्रकार अस्तित्वात नाही.",
      ta: "போலியானது. அத்தகைய குறிப்போ அல்லது தொழில்நுட்பமோ நம்பகமான இடங்களில் குறிப்பிடப்படவில்லை.",
    },
    source: {
      en: "Check your phone's own camera-access log in settings. It's right there.",
      hi: "अपने फ़ोन की सेटिंग्स में कैमरा-एक्सेस लॉग देखें। वहीं मिल जाएगा।",
      mr: "तुमच्या फोनच्या सेटिंग्जमधील कॅमेरा-अॅक्सेस हिस्ट्री तपासा.",
      ta: "உங்கள் போன் அமைப்புகளில் கேமரா பயன்பாட்டு வரலாற்றை சரிபார்க்கவும்.",
    },
  },
  {
    id: "p10",
    handle: "@sania.q",
    name: "Sania Qureshi",
    time: "11h",
    avatarTone: "sunny",
    kind: "text",
    caption: {
      en: "Correction on my post from Tuesday: the figure I quoted was for the whole state, not our district. Sorry — updated thread below.",
      hi: "मंगलवार की मेरी पोस्ट में सुधार: जो आँकड़ा मैंने दिया वह पूरे राज्य का था, हमारे ज़िले का नहीं। माफ़ी — नीचे सुधरा हुआ थ्रेड।",
      mr: "मंगळवारच्या पोस्टबाबत दुरुस्ती: मी दिलेली आकडेवारी संपूर्ण राज्याची होती, जिल्ह्याची नाही. क्षमस्व — खाली दुरुस्त केलेला थ्रेड.",
      ta: "செவ்வாய் பதிவில் திருத்தம்: நான் குறிப்பிட்ட எண்ணிக்கை மாநிலத்திற்கானது, மாவட்டத்திற்கானது அல்ல. மன்னிக்கவும் — திருத்தப்பட்ட பதிவு கீழே.",
    },
    stats: { likes: 512, shares: 74, comments: 96 },
    fake: false,
    category: {
      en: "Corrects itself",
      hi: "खुद को सुधारता है",
      mr: "स्वतःची चूक सुधारते",
      ta: "சுயமாக திருத்திக்கொள்கிறது",
    },
    tells: [],
    verdict: {
      en: "Genuine. Accountability is the rarest signal on any feed.",
      hi: "असली। जवाबदेही किसी भी फ़ीड का सबसे दुर्लभ संकेत है।",
      mr: "खरे. स्वतःची चूक मान्य करणे हे सोशल मीडियावर दुर्मिळ लक्षण आहे.",
      ta: "உண்மையானது. பொறுப்புக்கூறல் சோஷியல் மீடியாவில் அரிதான ஒரு அறிகுறியாகும்.",
    },
  },
];

export const TOOLKIT: { title: LocalizedText; body: LocalizedText }[] = [
  {
    title: {
      en: "Pause on the spike",
      hi: "उभार पर रुकें",
      mr: "भावनिक आवेगावर थांबा",
      ta: "உணர்ச்சி கொந்தளிப்பில் நிறுத்துங்கள்",
    },
    body: {
      en: "If a post makes you feel a sudden spike — rage, fear, vindication — that feeling is the payload. Wait ten seconds before your thumb moves.",
      hi: "अगर कोई पोस्ट अचानक गुस्सा, डर या 'मैं सही था' का भाव जगाए — वही असली हथियार है। अंगूठा चलाने से पहले दस सेकंड रुकें।",
      mr: "जर एखाद्या पोस्टमुळे अचानक राग, भीती किंवा द्वेष निर्माण होत असेल तर १० सेकंद थांबा. मगच निर्णय घ्या.",
      ta: "ஒரு பதிவு கோபம், பயம் அல்லது வெறுப்பை தூண்டினால் 10 வினாடிகள் பொறுத்திருங்கள்.",
    },
  },
  {
    title: {
      en: "Name the source out loud",
      hi: "स्रोत का नाम बोलकर कहें",
      mr: "स्त्रोताचे नाव मोठ्याने सांगा",
      ta: "ஆதாரத்தின் பெயரை உரக்கச் சொல்லுங்கள்",
    },
    body: {
      en: "Who exactly is saying this, and how would they know? If you can't answer both, you don't have information — you have a rumour with graphics.",
      hi: "यह कह कौन रहा है, और उसे पता कैसे चला? दोनों का जवाब न हो तो यह जानकारी नहीं, ग्राफ़िक्स वाली अफ़वाह है।",
      mr: "हे नेमके कोण सांगत आहे आणि त्यांना हे कसे माहित? उत्तर नसेल तर ती बातमी नसून केवळ एक अफवा आहे.",
      ta: "இதை யார் சொல்கிறார்கள், அவர்களுக்கு எப்படி தெரியும்? விடை இல்லை என்றால் அது செய்தியல்ல, வதந்தி.",
    },
  },
  {
    title: {
      en: "Listen to the tail",
      hi: "अंत सुनें",
      mr: "शेवटचे शब्द ऐका",
      ta: "முடிவுப் பகுதியை கவனியுங்கள்",
    },
    body: {
      en: "In voice notes, the last second of each sentence gives away cloning: identical falling tone, no breath, no room echo.",
      hi: "वॉइस नोट में हर वाक्य का आख़िरी क्षण क्लोनिंग खोल देता है: एक जैसा गिरता सुर, न साँस, न कमरे की गूँज।",
      mr: "व्हॉईस टीपमध्ये वाक्याचा शेवटचा भाग क्लोनिंग उघड करतो: एकसारखा सपाट आवाज आणि श्वासाचा अभाव.",
      ta: "குரல் பதிவில் வாக்கியத்தின் கடைசி நொடியில் செயற்கை குரலின் தன்மையை கண்டுபிடிக்கலாம்.",
    },
  },
  {
    title: {
      en: "Reverse the image",
      hi: "तस्वीर उलट कर खोजें",
      mr: "फोटो रिव्हर्स सर्च करा",
      ta: "படத்தை கூகிளில் தேடுங்கள்",
    },
    body: {
      en: "Long-press, search by image. Most 'breaking' photos are years old and from somewhere else entirely.",
      hi: "लॉन्ग-प्रेस कर इमेज से खोजें। ज़्यादातर 'ताज़ा' तस्वीरें बरसों पुरानी और किसी और जगह की होती हैं।",
      mr: "फोटोवर लाँग-प्रेस करा आणि इमेज द्वारे शोधा. बऱ्याच नवीन वाटणाऱ्या बातम्यांचे फोटो जुने असतात.",
      ta: "படத்தை அழுத்தி கூகிளில் தேடுங்கள். பெரும்பாலான 'பிரேக்கிங்' புகைப்படங்கள் பல வருடங்கள் பழமையானவை.",
    },
  },
  {
    title: {
      en: "Forward the tell, not the clip",
      hi: "क्लिप नहीं, पहचान भेजें",
      mr: "क्लिप नाही, कारण पाठवा",
      ta: "வீடியோவை அல்ல, அடையாளத்தை பகிருங்கள்",
    },
    body: {
      en: "When you catch one, send your family group the reason it's fake. Forwarding the fake to warn people just spreads it further.",
      hi: "जब पकड़ लें, तो परिवार के ग्रुप में वजह भेजें कि यह नकली क्यों है। चेतावनी के नाम पर नकली भेजना उसे और फैलाता है।",
      mr: "एखादा मेसेज फेक आढळल्यास तो फेक असण्याचे कारण ग्रुपमध्ये पाठवा. फेक मेसेज फॉरवर्ड करू नका.",
      ta: "ஒரு போலி செய்தியை கண்டுபிடித்தால் அது போலி என்பதற்கான காரணத்தை பகிருங்கள்.",
    },
  },
  {
    title: {
      en: "Money never needs a PIN",
      hi: "पैसा लेने में पिन नहीं लगता",
      mr: "पैसे मिळण्यासाठी पिन लागत नाही",
      ta: "பணம் பெற PIN தேவையில்லை",
    },
    body: {
      en: "No scheme, refund or prize will ever ask for your UPI PIN or an OTP to send you money. Report to 1930.",
      hi: "कोई योजना, रिफंड या इनाम पैसे भेजने के लिए UPI पिन या OTP नहीं माँगता। 1930 पर शिकायत करें।",
      mr: "कोणतीही योजना तुम्हाला पैसे देण्यासाठी UPI PIN किंवा OTP मागत नाही. १९३० वर तक्रार करा.",
      ta: "பணம் அனுப்ப எந்த திட்டமும் UPI PIN அல்லது OTP ஐக் கேட்காது. 1930 இல் புகாரளிக்கவும்.",
    },
  },
];

export const UI = {
  title: { en: "VaaniFeed", hi: "वाणीफ़ीड", mr: "वाणीफीड", ta: "வாணிஃபீட்" },
  langLabel: {
    en: "Feed language",
    hi: "फ़ीड की भाषा",
    mr: "फीडची भाषा",
    ta: "ஊட்ட மொழி",
  },
  start: {
    en: "Open the feed",
    hi: "फ़ीड खोलें",
    mr: "फीड उघडा",
    ta: "ஊட்டத்தைத் திறக்குக",
  },
  like: { en: "Like", hi: "पसंद", mr: "लाईक", ta: "விருப்பம்" },
  share: { en: "Share", hi: "शेयर", mr: "शेअर", ta: "பகிர்" },
  skip: { en: "Scroll past", hi: "आगे बढ़ें", mr: "पुढे जा", ta: "தாண்டிச் செல்" },
  freeze: {
    en: "Hold on.",
    hi: "एक मिनट रुकिए।",
    mr: "एक मिनिट थांबा.",
    ta: "ஒரு நிமிடம் நில்லுங்கள்.",
  },
  reveal: {
    en: "Here's what you missed",
    hi: "आपने यह चूक दिया",
    mr: "तुमच्याकडून हे सुटले",
    ta: "நீங்கள் தவறவிட்டது இதுவே",
  },
  goodCatch: {
    en: "Good catch.",
    hi: "बढ़िया पकड़ा।",
    mr: "छान ओळखले.",
    ta: "சிறந்த கண்டுபிடிப்பு.",
  },
  missed: {
    en: "That one got you.",
    hi: "यह आपको ले गया।",
    mr: "हे तुमच्या लक्षात आले नाही.",
    ta: "நீங்கள் இதில் ஏமாந்துவிட்டீர்கள்.",
  },
  continue: {
    en: "Keep scrolling",
    hi: "आगे स्क्रॉल करें",
    mr: "पुढे स्क्रोल करा",
    ta: "தொடர்ந்து ஸ்க்ரோல் செய்",
  },
  scoreTitle: {
    en: "Your Resilience Score",
    hi: "आपका रेज़िलिएंस स्कोर",
    mr: "तुमचा रेझिलियन्स स्कोर",
    ta: "உங்கள் நெகிழ்ச்சிப் புள்ளிகள்",
  },
  again: {
    en: "Run it again",
    hi: "फिर से चलाएँ",
    mr: "पुन्हा प्रयत्न करा",
    ta: "மீண்டும் முயற்சிக்கவும்",
  },
  toolkit: {
    en: "VaaniKit — carry this with you",
    hi: "वाणीकिट — इसे साथ रखें",
    mr: "वाणीकीट — हे सोबत ठेवा",
    ta: "வாணிகிட் — இதை உங்களுடன் வைத்திருங்கள்",
  },
} as const;
