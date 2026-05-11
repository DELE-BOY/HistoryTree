const mockData = {
    Nigeria: {
      "1960": [
        {
          date: "1960-01-15",
          name: "Constitutional Conference",
          shortDescription: "Final steps toward independence",
          description: "January 1960 saw crucial constitutional conferences preparing Nigeria for independence. These discussions finalized the framework for the new nation.",
          significance: "These early conferences set the stage for Nigeria's smooth transition to independence just months later.",
          image: "https://via.placeholder.com/600x400?text=Constitutional+Conference+1960"
        },
        {
          date: "1960-01-15",
          name: "Political Rallies Begin",
          shortDescription: "Independence celebrations commence",
          description: "Citizens and political leaders began organizing rallies and celebrations in anticipation of Nigeria's independence. The excitement and optimism were palpable across the nation.",
          significance: "These grassroots celebrations demonstrated the widespread support for independence among the Nigerian people.",
          image: "https://via.placeholder.com/600x400?text=Independence+Rallies+1960"
        },
        {
          date: "1960-01-20",
          name: "Economic Planning Session",
          shortDescription: "Post-independence economic strategies discussed",
          description: "Government officials and economic advisors convened to plan Nigeria's economic future as an independent nation. Focus areas included trade policies, currency management, and development initiatives.",
          significance: "These early economic discussions would shape Nigeria's fiscal policies in the critical first years of independence.",
          image: "https://via.placeholder.com/600x400?text=Economic+Planning+1960"
        },
        {
          date: "1960-10-01",
          name: "Nigerian Independence",
          shortDescription: "Nigeria gains independence from British rule",
          description: "On October 1, 1960, Nigeria gained independence from British colonial rule. The event marked the birth of Africa's most populous nation as a sovereign state after decades of British control.",
          significance: "This event marked the beginning of Nigeria's journey as an independent nation and set the stage for its development as a major African power.",
          image: "https://via.placeholder.com/600x400?text=Nigerian+Independence+1960"
        },
        {
          date: "1960-10-01",
          name: "Abubakar Tafawa Balewa",
          shortDescription: "First Prime Minister of independent Nigeria",
          description: "Abubakar Tafawa Balewa became the first Prime Minister of independent Nigeria in 1960. He was a respected leader known for his moderation and commitment to unity.",
          significance: "Balewa's leadership was crucial in establishing Nigeria's early governance structures and international relations in the post-colonial era.",
          image: "https://via.placeholder.com/600x400?text=Abubakar+Tafawa+Balewa"
        }
      ],
      "1963": [
        {
          date: "1963-10-01",
          name: "Nigerian Republic",
          shortDescription: "Nigeria becomes a republic",
          description: "On October 1, 1963, Nigeria became a republic, replacing the British monarch as head of state with a Nigerian president. This completed the process of independence from British rule.",
          significance: "The transition to a republic represented Nigeria's full sovereignty and the complete removal of British authority from its governance.",
          image: "https://via.placeholder.com/600x400?text=Nigerian+Republic+1963"
        }
      ],
      "1967": [
        {
          date: "1967-07-06",
          name: "Nigerian Civil War Begins",
          shortDescription: "Start of the Biafran War",
          description: "In July 1967, the Nigerian Civil War (also known as the Biafran War) began when the southeastern provinces attempted to secede and form the Republic of Biafra.",
          significance: "The war had profound consequences for Nigeria's unity and development, resulting in over a million deaths and shaping national identity.",
          image: "https://via.placeholder.com/600x400?text=Nigerian+Civil+War"
        }
      ],
      "1970": [
        {
          date: "1970-01-15",
          name: "End of Civil War",
          shortDescription: "Biafra surrenders, civil war ends",
          description: "On January 15, 1970, the Nigerian Civil War ended with the surrender of Biafran forces. This brought the three-year conflict to a close and resulted in the reintegration of the southeastern regions.",
          significance: "The end of the war allowed Nigeria to begin rebuilding and reconciliation, though the effects of the conflict would continue to influence politics and ethnic relations.",
          image: "https://via.placeholder.com/600x400?text=End+of+Nigerian+Civil+War"
        }
      ]
    },

    // REGIONS DATA FOR NIGERIA
    Nigeria_regions: [
      { id: "LA", name: "Lagos", description: "Former colonial capital, center of independence celebrations" },
      { id: "KN", name: "Kano", description: "Northern political hub, coordination center for northern leaders" },
      { id: "KD", name: "Kaduna", description: "Northern administrative center, strategic political region" },
      { id: "RV", name: "Rivers", description: "Southeastern region, future economic powerhouse" },
      { id: "EN", name: "Enugu", description: "Eastern heartland, cultural and political center" },
      { id: "IB", name: "Ibadan", description: "Western intellectual hub, education and culture" },
      { id: "AB", name: "Abeokuta", description: "Western gateway, trade and cultural significance" },
      { id: "BN", name: "Benin City", description: "Historical kingdom, cultural preservation center" },
      { id: "JO", name: "Jos", description: "Central plateau region, diverse population center" },
      { id: "MA", name: "Maiduguri", description: "Far northern region, Sahel frontier" }
    ],

    // REGIONAL CONTEXT FOR SPECIFIC DATES
    Nigeria_regionalContext: {
      "1960-01-15": {
        "LA": "Lagos buzzes with independence momentum. The colonial capital becomes the epicenter of celebrations and political gatherings. Streets fill with nationalists discussing Nigeria's future governance.",
        "KN": "Kano serves as the northern coordination hub. Ahmadu Bello mobilizes northern political factions and ensures the north's voice in independence negotiations.",
        "RV": "Rivers region, largely rural and agricultural, observes independence preparations. The region has no idea that oil discovery will transform it within years.",
        "EN": "Enugu pulses with Igbo nationalist sentiment. Eastern leaders prepare for their role in the new Nigerian federation, optimistic about possibilities.",
        "IB": "Ibadan, the intellectual center, hosts discussions among scholars and political thinkers. University circles debate Nigeria's governance models.",
        "AB": "Abeokuta watches independence unfold with Yoruba pride. The region prepares for its place in Nigeria's federal structure.",
        "JO": "Jos remains relatively quiet, though representatives participate in national independence planning.",
        "BN": "Benin maintains its historical dignity. The kingdom acknowledges Nigeria's independence while preserving its cultural heritage.",
        "MA": "Maiduguri, in the far north, remains distant from the coastal independence celebrations but participates in northern coordination.",
        "JO": "Jos plateau communities prepare for integration into independent Nigeria."
      },
      "1960-10-01": {
        "LA": "Lagos celebrates as the capital of independent Nigeria. Official independence ceremonies occur here. Crowds fill the streets in jubilation.",
        "KN": "Kano celebrates independence as part of the north. Ahmadu Bello consolidates power in the Northern Region of the new federation.",
        "RV": "Rivers celebrates independence, still unaware of oil's transformative power lurking beneath the surface.",
        "EN": "Enugu celebrates independence with hope. The region anticipates prosperity and development in the new nation.",
        "IB": "Ibadan hosts celebrations reflecting on Nigeria's intellectual journey to independence.",
        "AB": "Abeokuta celebrates Yoruba representation in independent Nigeria.",
        "BN": "Benin celebrates while maintaining its historical identity within Nigeria.",
        "MA": "Maiduguri celebrates Nigeria's independence with the entire north."
      }
    },

    // HISTORICAL FIGURES FOR NIGERIA
    Nigeria_figures: [
      {
        id: "ahmadu",
        name: "Ahmadu Bello",
        role: "Political Leader",
        region: "KN",
        era: "1950-1966",
        bio: "Sir Ahmadu Bello was the Premier of Northern Region and a key figure in Nigeria's independence movement. Known for his efforts to unify northern territories and advocate for northern interests in the federation.",
        influence: "Led northern political coordination during independence. Consolidated Hausa-Fulani political power.",
        quote: "Unity in diversity",
        image: "https://via.placeholder.com/200x280?text=Ahmadu+Bello"
      },
      {
        id: "nnamdi",
        name: "Nnamdi Azikiwe",
        role: "First Governor-General & President",
        region: "EN",
        era: "1948-1979",
        bio: "Dr. Nnamdi Azikiwe was Nigeria's first Governor-General (1960-1963) and later its first President (1963-1966). A pan-Africanist intellectual and journalist, he championed Nigerian unity and African independence.",
        influence: "Inspired independence movement through journalism. Promoted Pan-African ideology. Symbolized southern aspirations.",
        quote: "I believe in the god of Africa",
        image: "https://via.placeholder.com/200x280?text=Nnamdi+Azikiwe"
      },
      {
        id: "balewa",
        name: "Abubakar Tafawa Balewa",
        role: "Prime Minister",
        region: "KN",
        era: "1957-1966",
        bio: "Nigeria's first Prime Minister, known for his moderate, nationalist approach. Balewa navigated complex ethnic and regional interests while establishing Nigeria's international relations.",
        influence: "Established diplomatic protocols. Promoted unity through pragmatic governance. Tragic assassination shaped nation's trajectory.",
        quote: "Nigeria's strength lies in unity",
        image: "https://via.placeholder.com/200x280?text=Abubakar+Balewa"
      },
      {
        id: "obafemi",
        name: "Obafemi Awolowo",
        role: "Political Leader & Chief",
        region: "IB",
        era: "1945-1987",
        bio: "Premier of Western Region and pan-Yoruba political leader. Awolowo was an intellectual and advocate for Yoruba interests. Known for his progressive policies in education and infrastructure.",
        influence: "Shaped western Nigeria's development. Led Yoruba political movement. Pioneered education expansion.",
        quote: "Freedom for all, life more abundant for everyone",
        image: "https://via.placeholder.com/200x280?text=Obafemi+Awolowo"
      },
      {
        id: "gowon",
        name: "Yakubu Gowon",
        role: "Military Head of State",
        region: "JO",
        era: "1966-1975",
        bio: "Military ruler who led Nigeria through the civil war. Though young, Gowon's leadership preserved Nigeria's unity during the Biafran conflict. Later pursued reconciliation.",
        influence: "Preserved Nigerian federation. Led through existential crisis. Promoted national reconciliation after civil war.",
        quote: "To keep Nigeria one is a task that must be done",
        image: "https://via.placeholder.com/200x280?text=Yakubu+Gowon"
      }
    ],

    // RANDOM JOURNEY THEMES & PROMPTS
    randomThemes: [
      "independence",
      "political_power",
      "cultural_identity",
      "economic_change",
      "regional_conflict",
      "international_relations",
      "infrastructure",
      "education",
      "trade_routes",
      "ethnic_relations"
    ],

    randomPrompts: {
      independence: [
        "How would independence celebrations look different in this region?",
        "What local hopes and fears about independence might exist here?",
        "How do you think this region prepared for life as an independent nation?"
      ],
      political_power: [
        "Who held influence in this region during this time?",
        "What political tensions existed that most people didn't know about?",
        "How did power shift in this region during this era?"
      ],
      cultural_identity: [
        "What cultural traditions were most important to people here?",
        "How did colonialism affect this region's cultural identity?",
        "What would you hear if you walked through a market on this day?"
      ],
      economic_change: [
        "What goods were traded through this region?",
        "How was the economy transitioning during this period?",
        "What economic opportunities seemed possible then?"
      ],
      regional_conflict: [
        "What tensions simmered beneath the surface in this region?",
        "How did regional differences create division?",
        "What could have prevented conflict in this region?"
      ],
      international_relations: [
        "What foreign powers had influence here?",
        "How did this region's relationship with the outside world matter?",
        "What international perspectives shaped local events?"
      ],
      infrastructure: [
        "What roads, buildings, or systems were being developed?",
        "How was technology changing life here?",
        "What infrastructure dreams existed for the future?"
      ],
      education: [
        "What educational opportunities existed in this region?",
        "How were young people being prepared for the future?",
        "What knowledge was most valued?"
      ],
      trade_routes: [
        "What goods connected this region to the wider world?",
        "How did trade shape daily life here?",
        "What merchants would have passed through?"
      ],
      ethnic_relations: [
        "What ethnic groups lived in or near this region?",
        "How did different groups interact daily?",
        "What shared interests united different communities?"
      ]
    },

    // TRIVIA QUESTIONS FOR NIGERIA
    Nigeria_trivia: [
      {
        question: "Which region became Nigeria's primary oil-producing area?",
        options: ["Lagos", "Rivers", "Kano", "Enugu"],
        answer: "Rivers",
        explanation: "Rivers State in the Niger Delta became the center of Nigeria's oil industry after oil was discovered there in the late 1950s."
      },
      {
        question: "Who was Nigeria's first Prime Minister?",
        options: ["Nnamdi Azikiwe", "Abubakar Tafawa Balewa", "Ahmadu Bello", "Obafemi Awolowo"],
        answer: "Abubakar Tafawa Balewa",
        explanation: "Abubakar Tafawa Balewa served as Prime Minister from 1957 until his assassination in 1966."
      },
      {
        question: "In what year did Nigeria become independent?",
        options: ["1958", "1959", "1960", "1961"],
        answer: "1960",
        explanation: "Nigeria gained independence on October 1, 1960, ending British colonial rule."
      },
      {
        question: "What was the primary cause of the Nigerian Civil War (1967-1970)?",
        options: ["Religious conflict", "Ethnic tensions", "Southeastern secession attempt", "Oil disputes"],
        answer: "Southeastern secession attempt",
        explanation: "The civil war began when southeastern Nigeria attempted to secede and form the independent Republic of Biafra."
      },
      {
        question: "Which northern leader coordinated the north during independence?",
        options: ["Yakubu Gowon", "Ahmadu Bello", "Abubakar Balewa", "Nnamdi Azikiwe"],
        answer: "Ahmadu Bello",
        explanation: "Sir Ahmadu Bello was the Premier of Northern Region and played a crucial role in northern political coordination."
      },
      {
        question: "What was Nigeria's former capital before Lagos?",
        options: ["Kano", "Ibadan", "Abuja", "Lagos was always the capital"],
        answer: "Lagos was always the capital",
        explanation: "Lagos remained Nigeria's capital from independence in 1960 until 1991 when the capital moved to Abuja."
      },
      {
        question: "Who was Nigeria's first Head of State as a republic?",
        options: ["Abubakar Balewa", "Yakubu Gowon", "Nnamdi Azikiwe", "Aguyi Ironsi"],
        answer: "Nnamdi Azikiwe",
        explanation: "Nnamdi Azikiwe became Nigeria's first President when the country became a republic in 1963."
      }
    ],

    // TIMELINE DATA FOR NIGERIAN REGIONS
    Nigeria_timeline: {
      "LA": [
        { year: 1950, event: "Colonial Administration Center", theme: "governance", description: "Lagos serves as the seat of British colonial power in Nigeria." },
        { year: 1960, event: "Independence Capital", theme: "independence", description: "Lagos becomes the capital of independent Nigeria with official ceremonies." },
        { year: 1967, event: "Civil War Base", theme: "conflict", description: "Lagos serves as the federal capital during the Biafran conflict." },
        { year: 1970, event: "Reconciliation Hub", theme: "unity", description: "Post-war Lagos focuses on national reconciliation and rebuilding." }
      ],
      "KN": [
        { year: 1950, event: "Northern Political Hub", theme: "governance", description: "Kano consolidates northern political power under Ahmadu Bello." },
        { year: 1960, event: "Independence North", theme: "independence", description: "Kano celebrates independence as part of the Northern Region." },
        { year: 1967, event: "Northern Base", theme: "conflict", description: "Kano remains a power center during the civil war." },
        { year: 1970, event: "Reconstruction", theme: "development", description: "Post-war northern development initiatives begin." }
      ],
      "EN": [
        { year: 1950, event: "Eastern Cultural Center", theme: "culture", description: "Enugu develops as the intellectual and cultural heart of eastern Nigeria." },
        { year: 1960, event: "Independence Optimism", theme: "independence", description: "Enugu celebrates independence with great hope for development." },
        { year: 1967, event: "Biafran Capital", theme: "conflict", description: "Enugu becomes a major center during the Biafran secession." },
        { year: 1970, event: "Post-War Recovery", theme: "recovery", description: "Enugu begins the long process of reconstruction after the civil war." }
      ],
      "RV": [
        { year: 1950, event: "Rural Delta", theme: "agriculture", description: "Rivers region remains largely agricultural and traditional." },
        { year: 1960, event: "Oil Discovery Era", theme: "economic", description: "Oil begins to be discovered in Rivers, changing its future." },
        { year: 1967, event: "Oil Region Conflict", theme: "conflict", description: "Rivers becomes strategic during civil war due to oil resources." },
        { year: 1970, event: "Oil Boom Beginning", theme: "economic", description: "Post-war oil production accelerates, transforming the region." }
      ]
    }
  };
  
  export default mockData;