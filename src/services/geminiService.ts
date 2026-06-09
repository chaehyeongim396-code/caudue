export interface PatternDesign {
  title: string;
  description: string;
  colors: string[];
  styleHints: string[];
  story: string;
}

// Highly stylized procedural presets for various branding styles
const PRESETS: Record<string, {
  colors: string[];
  styleHints: string[];
  titles: string[];
  descriptions: { withText: string; default: string };
  stories: { withText: string; default: string };
}> = {
  balletcore: {
    colors: ["#FAF5FC", "#F1E5F8", "#E0CCEB", "#BC9ECC", "#FFFFFF"],
    styleHints: ["Satin ribbons", "Silk corsages", "Tulle mist", "Polished slippers", "Delicate pearls"],
    titles: [
      "발레리나의 첫 무대",
      "새벽 안개의 몸짓",
      "꽃잎 속 숨겨진 레이스"
    ],
    descriptions: {
      withText: "'{memory}'에서 느껴지는 아련하고 섬세한 선율을 투명한 실크 리본과 레이스 텍스처로 엮어낸 우아한 패턴 디자인입니다.",
      default: "우아하고 부드러운 발레리나의 몸짓과 레이스를 모티프로 한 디테일로, 실크 안개처럼 겹겹이 흩날리는 감각적인 패턴 디자인입니다."
    },
    stories: {
      withText: "'{memory}'의 숨결이 닿은 흔적들을 따라, 아련히 흩어지는 분홍빛 토슈즈의 기억을 불러옵니다. 빛바랜 거울 속에 비친 우아한 선을 그리는 선율처럼, 이 디자인은 당신의 소중한 기억을 따스하고 고운 실크 리본으로 포근하게 매듭지어 줍니다.",
      default: "무대 너머 조용히 울려 퍼지는 오르골 선율과 실크 리본의 가벼운 움직임을 담았습니다. 가득 찬 무대 뒤에서 숨 고르던 그 첫 발자국처럼, 부드러운 설렘과 꿈을 겹겹이 고운 레이스로 담아내어 은은하고 따뜻한 정체성을 완성시킵니다."
    }
  },
  romantic: {
    colors: ["#FCF5F3", "#F5DAD2", "#ECA798", "#D1705D", "#FFFFFF"],
    styleHints: ["Petals falling", "Warm candlelight", "Whispering breeze", "Velvet touch", "Delicate vintage bloom"],
    titles: [
      "장미 정원의 정오",
      "어느 눈부신 봄날의 귓속말",
      "영원한 사랑의 서막"
    ],
    descriptions: {
      withText: "'{memory}' 속 소중한 사랑의 감정선을 모아 고운 장미 잎새와 따사로운 햇살의 온기로 투영해 낸 포근하고 사랑스러운 패턴 디자인입니다.",
      default: "살랑이는 잔바람에 흔들리는 부드러운 장미 꽃잎들과 따뜻한 촛불의 은은함을 담아 시각화한 사랑스러운 하이엔드 패턴 디자인입니다."
    },
    stories: {
      withText: "마치 달콤하고 설레었던 서투른 첫 연서처럼, 당신이 전해준 '{memory}'의 한 조각이 가슴 깊은 곳에 부드러운 꽃바람을 일으킵니다. 수줍게 물든 분홍빛 맑은 수채화 물감들이 천천히 퍼져나가며, 계절이 스쳐 지나도 지워지지 않는 따스한 입맞춤 같은 낭만으로 남게 됩니다.",
      default: "가장 포근한 영혼의 휴식처에서 주고받던 고요한 한 문장의 따뜻함을 담아냈습니다. 햇살이 창가를 타고 방 안을 은은히 가득 채울 때 피어오르는 온기처럼, 언제까지나 변하지 않는 장미빛 미소를 노래합니다."
    }
  },
  vintage: {
    colors: ["#FAF6EF", "#E4D5BE", "#A59273", "#B1BD9A", "#FDFDFD"],
    styleHints: ["Antique paper", "Sun-bleached linen", "Muted botanical drawings", "Teatime stains", "Folk tapestry"],
    titles: [
      "오래된 서랍 속 편지",
      "햇빛 속 아련한 들꽃",
      "기억이 시간을 멈춘 곳"
    ],
    descriptions: {
      withText: "'{memory}' 속에 은은히 서려 있는 그리움의 흔적들을 아날로그적인 무드와 세이지 그린, 빛바랜 고서의 팔레트로 정교히 자아낸 깊이 있는 보태니컬 디자인입니다.",
      default: "햇빛에 세월을 머금고 그을린 따뜻한 린넨 원단 위, 시간의 지문이 아프지 않게 깊어진 빈티지 야생화 드로잉을 차분하게 수놓은 클래식 북유럽풍 컬렉션입니다."
    },
    stories: {
      withText: "소중한 낙엽잎 한 조각에 조심스레 새겨놓은 일글씨처럼, 당신이 고요히 건네준 '{memory}'의 이야기에는 아름답고 변하지 않는 시간의 가치가 서려 있습니다. 오랜 시간 서랍 가장 깊숙이 스며있던 흑백 사진 속 은은함처럼 가공되지 않는 빈티지 감성과 아늑한 온도로 옷을 입힙니다.",
      default: "먼지가 살포시 앉은 오래된 다이어리를 조심스레 펼쳐보았을 때 가슴 뛰게 맞이하던 따뜻하고 은은한 향을 그렸습니다. 시간의 영구함 속에서 잔잔한 들꽃 모티프는 그 자체로서 영원히 마르지 않는 클래식의 자부심을 선포합니다."
    }
  },
  "soft-luxury": {
    colors: ["#F4F1E9", "#DFD6C3", "#9B9077", "#CCD7D1", "#FFFFFF"],
    styleHints: ["Silk weavings", "Fine marble textures", "Drape lines", "Minimalist symmetry", "Sober metal highlights"],
    titles: [
      "고요한 실크의 흐름",
      "캐시미어 위에 내린 아침",
      "은빛 조각과의 대화"
    ],
    descriptions: {
      withText: "'{memory}'에서 불어오는 우아하고 세련된 잔향을 흐르는 듯한 유기적 곡선과 차분한 캐시미어 샌드 톤으로 완성도 높게 일궈낸 모던 럭셔리 패턴 디자인입니다.",
      default: "장식을 덜어낸 미니멀한 실루엣 속에서 자연스럽게 물결치며 흘러내리는 고급 실크 직물의 주름과 명암을 부드러운 뉴트럴 베이지로 직조한 럭셔리 콜라보레이션입니다."
    },
    stories: {
      withText: "그 어느 보석보다 소중히 마음을 감싸 안는 편안한 캐시미어처럼, 당신이 전해준 '{memory}'의 소리는 우아하면서도 마음에 영엄한 울림을 줍니다. 시선을 사로잡는 화려함이 아니더라도, 오랜 여운을 주는 당신의 품격을 담아 명품 실크 실들의 조화로운 직물로 기품 있게 엮어냈습니다.",
      default: "모든 소음이 거두어진 이른 아침, 빈 미술관에 홀로 서 있을 때 몸짓으로 다가오는 한 줄기의 깊은 평화와 지혜를 담았습니다. 절제미 가득한 비단 실크의 짜임과 세밀하게 조율된 오가닉 음영을 통하여, 정적 속에서도 깊이 있는 반짝임을 지닌 우아한 멋을 드러냅니다."
    }
  }
};

export async function generatePatternFromMemory(input: { text?: string; imageBase64?: string; style: string }): Promise<PatternDesign> {
  try {
    const response = await fetch('/api/generate-pattern', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Failed to generate pattern on server');
    }

    return await response.json();
  } catch (error) {
    console.warn("API server not accessible or returned an error. Serving high-fidelity client-side generative fallback:", error);
    
    // Choose beautiful localized fallback
    const styleKey = (input.style && PRESETS[input.style]) ? input.style : 'balletcore';
    const preset = PRESETS[styleKey];
    
    // Pick seed based on random or text lengths to keep it consistent-ish
    const textLen = (input.text || "").length;
    const titleIdx = textLen % preset.titles.length;
    let baseTitle = preset.titles[titleIdx];
    
    // Clean memory representation
    let memoryStr = "";
    if (input.text && input.text.trim().length > 0) {
      memoryStr = input.text.trim();
      if (memoryStr.length > 25) {
        memoryStr = memoryStr.slice(0, 22) + "...";
      }
    } else {
      memoryStr = "당신이 전해준 소중한 기운";
    }

    // Build unique title based on keywords
    let textKeywords = "";
    if (input.text && input.text.trim()) {
      const words = input.text.trim().split(/\s+/).filter(w => w.length >= 2);
      if (words.length > 0) {
        textKeywords = words[words.length - 1];
      }
    }
    
    const finalTitle = textKeywords 
      ? `${baseTitle} (with ${textKeywords})`
      : baseTitle;

    const description = input.text 
      ? preset.descriptions.withText.replace('{memory}', memoryStr)
      : preset.descriptions.default;

    const story = input.text 
      ? preset.stories.withText.replace('{memory}', memoryStr)
      : preset.stories.default;

    // Slight dynamic variations to color hexes to feel truly unique on client side
    const customizedColors = [...preset.colors];
    if (textLen > 0) {
      // Modify middle colors slightly of the palette to reflect "uniqueness"
      const shift = (textLen % 10) - 5; // -5 to +4
      if (customizedColors[1] && customizedColors[1].startsWith('#')) {
        let r = parseInt(customizedColors[1].slice(1, 3), 16);
        let g = parseInt(customizedColors[1].slice(3, 5), 16);
        let b = parseInt(customizedColors[1].slice(5, 7), 16);
        r = Math.min(255, Math.max(0, r + shift));
        g = Math.min(255, Math.max(0, g + shift));
        b = Math.min(255, Math.max(0, b + shift));
        customizedColors[1] = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
    }

    return {
      title: finalTitle,
      description,
      colors: customizedColors,
      styleHints: preset.styleHints,
      story
    };
  }
}
