/* =============================================================
   GPT-2 Internals – Interactive Visualization  (script.js)
   =============================================================
   Steps:
     0  Raw Text Input
     1  Byte-Pair Encoding (Tokenization)
     2  Vocabulary Lookup  (Token → ID)
     3  Token Embeddings
     4  Positional Encoding
     5  Combined Input Embeddings
     6  Transformer Block Architecture  (overview)
     7  Self-Attention  (Q K V + heatmap)
     8  Feed-Forward Network  (GELU, expand/contract)
     9  ×12 Layers  (data flowing through all layers)
    10  Output Head  (LayerNorm → Linear → Softmax → Next token)
   ============================================================= */

// ── DOM refs ───────────────────────────────────────────────
const $ = id => document.getElementById(id);
const landing       = $('landing');
const walkthrough   = $('walkthrough');
const userInput     = $('user-input');
const startBtn      = $('start-btn');
const restartBtn    = $('restart-btn');
const skipBtn       = $('skip-anim-btn');
const prevBtn       = $('prev-btn');
const nextBtn       = $('next-btn');
const infoBtn       = $('info-btn');
const stageTitle    = $('stage-title');
const stepLabel     = $('step-label');
const progressBar   = $('progress-bar');
const progressDots  = $('progress-dots');
const explanation   = $('explanation');
const explanationTx = $('explanation-text');
const stage         = $('stage');

// ── State ──────────────────────────────────────────────────
let step = 0;
let skipRequested = false;
let animating = false;

const data = {
    text: '',
    tokens: [],
    ids: [],
    dim: 6,           // visual dim (we show 6 numbers; GPT-2 uses 768)
    selectedIdx: 0,
};

// ── GPT-2 vocabulary (common subset) ────────────────────────
const VOCAB = {
    '<|endoftext|>':50256, 'the':262, 'Ġthe':262, 'Ġa':257, 'Ġis':318,
    'Ġof':286, 'Ġto':284, 'Ġand':290, 'Ġin':287, 'Ġfor':329,
    'Ġthat':326, 'Ġit':340, 'ĠIt':632, 'Ġwas':373, 'Ġon':319,
    'Ġwith':351, 'Ġas':355, 'Ġare':389, 'Ġat':379, 'Ġbe':307,
    'Ġthis':428, 'ĠThis':770, 'Ġhave':423, 'Ġfrom':422,
    'Ġor':393, 'Ġan':281, 'Ġby':416, 'Ġnot':407,
    'ĠWhat':1867, 'Ġwhat':644, 'Ġif':611, 'Ġwill':481,
    'Ġcan':460, 'Ġall':477, 'Ġthere':612, 'ĠThere':1318,
    'Ġwould':561, 'Ġtheir':511, 'Ġwhich':543,
    'Hello':15496, 'Ġworld':995, 'Ġlife':1204,
    'Ġmeaning':3616, 'Ġmean':1612, 'ing':278,
    '.':13, ',':11, '?':30, '!':0, ' ':220,
    'ĠThe':383, 'Ġyou':345, 'Ġwe':356, 'Ġhas':468,
    'How':2437, 'ĠHow':1374, 'Ġhow':703, 'Why':5765, 'ĠWhy':4162,
    'Ġwhy':1521, 'Ġdo':466, 'Ġdoes':857, 'Ġwork':670,
    'Ġwho':508, 'Ġwhen':618, 'Ġwhere':810, 'Ġwhich':543,
    'Ġpeople':661, 'Ġtime':640, 'Ġway':835, 'Ġthing':1517,
};

// ── Step definitions ───────────────────────────────────────
const STEPS = [
    {
        title: 'Raw Text Input',
        explain: `Your text arrives as a raw stream of <b>Unicode characters</b>. The model has no concept of "words" yet — it just sees bytes. GPT-2 uses a <b>UTF-8</b> byte-level representation as the starting point for its tokenizer.`,
        render: renderRawText,
    },
    {
        title: 'Tokenization (BPE)',
        explain: `GPT-2 uses <b>Byte-Pair Encoding</b> to break text into sub-word tokens. Common words stay whole (e.g. "the"), while rare words get split into pieces (e.g. "meaning" → "mean" + "ing"). Spaces are attached to the <i>beginning</i> of words as a special Ġ character. GPT-2's vocabulary contains <b>50,257 tokens</b>.`,
        render: renderTokenization,
    },
    {
        title: 'Vocabulary Lookup',
        explain: `Each token string is looked up in the vocabulary table to get a unique integer <b>Token ID</b>. This is how we go from text to numbers. The vocabulary is a fixed mapping learned during training — every possible token has exactly one ID.`,
        render: renderVocabLookup,
    },
    {
        title: 'Token Embeddings',
        explain: `Each Token ID is used to index into an <b>Embedding Matrix W<sub>E</sub></b> of shape <b>(50,257 × 768)</b>. Each row is a learned 768-dimensional vector that encodes the <i>semantic meaning</i> of that token. Similar words end up with similar vectors. We show a simplified ${data.dim}-dim version here.`,
        render: renderTokenEmbeddings,
    },
    {
        title: 'Positional Encoding',
        explain: `Transformers process all tokens in parallel, so they have no built-in sense of order. GPT-2 adds a <b>learned positional embedding</b> (shape 1024 × 768) to tell the model <i>where</i> each token sits in the sequence. Position 0 gets one vector, position 1 another, etc. This is different from the original Transformer which used sine/cosine functions.`,
        render: renderPositionalEncoding,
    },
    {
        title: 'Combined Embeddings',
        explain: `The Token Embedding and Positional Embedding are <b>added element-wise</b> to produce the final input to the transformer stack. Each token now has a single vector that encodes <b>both what it means and where it is</b>.`,
        render: renderCombinedEmbeddings,
    },
    {
        title: 'Transformer Block',
        explain: `GPT-2 has <b>12 identical Transformer blocks</b> stacked on top of each other. Each block has two sub-layers: <b>Multi-Head Self-Attention</b> and a <b>Feed-Forward Network (MLP)</b>. Each sub-layer has a <b>residual connection</b> and <b>Layer Normalization</b>. This is the "pre-norm" variant — LayerNorm comes <i>before</i> each sub-layer.`,
        render: renderTransformerBlock,
    },
    {
        title: 'Self-Attention (Q·K·V)',
        explain: `Self-Attention lets each token look at every other token to gather context. The input is projected into three matrices: <b>Query (Q)</b>, <b>Key (K)</b>, and <b>Value (V)</b>. Attention scores = <b>softmax(Q·Kᵀ / √d<sub>k</sub>)</b>. GPT-2 uses <b>12 attention heads</b>, each with d<sub>k</sub>=64, so the model can attend to different types of relationships simultaneously. GPT-2 also uses a <b>causal mask</b> — each token can only attend to tokens before it (and itself).`,
        render: renderAttention,
    },
    {
        title: 'Feed-Forward Network',
        explain: `After attention, each token's vector passes through a <b>position-wise MLP</b>: first a linear layer expands 768 → 3072 dimensions (4×), applies <b>GELU activation</b>, then projects back 3072 → 768. This is where the model does its "thinking" — transforming the attention-gathered context into useful representations.`,
        render: renderFFN,
    },
    {
        title: '×12 Layers — Full Stack',
        explain: `The combined embedding passes through <b>all 12 transformer blocks</b> sequentially. Each layer refines the representations further — early layers tend to capture syntax and local patterns, while deeper layers capture semantics and long-range dependencies. The output of one layer becomes the input to the next.`,
        render: renderLayerStack,
    },
    {
        title: 'Output — Next Token Prediction',
        explain: `After all 12 layers, the final hidden state goes through <b>Layer Normalization</b>, then a <b>linear projection</b> to vocabulary size (768 → 50,257). A <b>softmax</b> converts these logits into a probability distribution over all possible next tokens. The model picks the most likely token (or samples from the distribution). GPT-2 generates text <b>autoregressively</b> — one token at a time, feeding each generated token back as input.`,
        render: renderOutput,
    },
];

const TOTAL_STEPS = STEPS.length;

// ── Utilities ──────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));
const skippableSleep = async (ms) => { if (!skipRequested) await sleep(ms); };

function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

function getID(tok) {
    if (VOCAB[tok] !== undefined) return VOCAB[tok];
    return hashStr(tok) % 50000 + 100;
}

function pseudoVec(seed, dim) {
    const v = [];
    for (let i = 0; i < dim; i++) {
        let x = Math.sin(seed * (i + 1) * 12.9898 + i * 78.233) * 43758.5453;
        v.push(+((x - Math.floor(x)) * 2 - 1).toFixed(2));
    }
    return v;
}

function positionalVec(pos, dim) {
    const v = [];
    for (let i = 0; i < dim; i++) {
        const k = Math.floor(i / 2);
        const freq = 1 / Math.pow(10000, (2 * k) / dim);
        v.push(+(i % 2 === 0 ? Math.sin(pos * freq) : Math.cos(pos * freq)).toFixed(2));
    }
    return v;
}

function addVec(a, b) { return a.map((v, i) => +(v + b[i]).toFixed(2)); }

function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined && typeof html === 'string') e.innerHTML = html;
    return e;
}

/** Set tooltip on an element */
function tip(element, text, position) {
    element.setAttribute('data-tip', text);
    if (position === 'below') element.classList.add('tip-below');
    if (position === 'left')  element.classList.add('tip-left');
    if (position === 'right') element.classList.add('tip-right');
    return element;
}

function makeVecEl(values, label, tooltip) {
    const wrap = el('div', 'vec');
    if (label) { const l = el('div', 'vec-label', label); wrap.prepend(l); }
    values.forEach((v, i) => {
        const c = el('div', 'vec-cell ' + (v >= 0 ? 'pos' : 'neg'), String(v));
        tip(c, `Dimension ${i}: value ${v}. ${v >= 0 ? 'Positive' : 'Negative'} activation — GPT-2 uses 768 of these dimensions.`, 'below');
        wrap.appendChild(c);
    });
    if (tooltip) tip(wrap, tooltip);
    return wrap;
}

function displayToken(tok) {
    return (typeof tok === 'string' && tok.startsWith('Ġ')) ? tok.slice(1) : String(tok);
}

// ── Tokenizer (simple BPE-like) ─────────────────────────────
function tokenize(text) {
    const parts = text.split(/(\s+|[.,!?;:'"()\-])/).filter(Boolean);
    const tokens = [];
    let prevSpace = false;
    for (const p of parts) {
        if (/^\s+$/.test(p)) { prevSpace = true; continue; }
        const prefix = (prevSpace && tokens.length > 0) ? 'Ġ' : '';
        prevSpace = false;
        if (/^[.,!?;:'"()\-]$/.test(p)) {
            tokens.push(prefix + p);
        } else if (p.length > 7) {
            const mid = Math.ceil(p.length * 0.55);
            tokens.push(prefix + p.slice(0, mid));
            tokens.push(p.slice(mid));
        } else {
            tokens.push(prefix + p);
        }
    }
    return tokens;
}

// ── Smart Output Generator ──────────────────────────────────
// Generates a plausible continuation for ANY input text.
function generateContinuation(inputText) {
    const t = inputText.toLowerCase().trim();
    const words = t.split(/\s+/);
    const lastWord = words[words.length - 1].replace(/[^a-z]/g, '');

    // Detect question patterns
    const isQuestion = t.includes('?') || /^(what|who|how|why|when|where|which|can|do|does|is|are|will|would|could|should|shall)/.test(t);

    // Detect topic keywords
    const topics = {
        life:     t.includes('life') || t.includes('living') || t.includes('alive'),
        meaning:  t.includes('meaning') || t.includes('purpose'),
        love:     t.includes('love') || t.includes('heart') || t.includes('feeling'),
        science:  t.includes('science') || t.includes('physics') || t.includes('quantum') || t.includes('atom'),
        tech:     t.includes('computer') || t.includes('code') || t.includes('program') || t.includes('software') || t.includes('ai') || t.includes('machine') || t.includes('learn'),
        food:     t.includes('food') || t.includes('eat') || t.includes('cook') || t.includes('recipe') || t.includes('hungry'),
        space:    t.includes('space') || t.includes('universe') || t.includes('star') || t.includes('planet') || t.includes('moon') || t.includes('galaxy'),
        history:  t.includes('history') || t.includes('ancient') || t.includes('war') || t.includes('century'),
        music:    t.includes('music') || t.includes('song') || t.includes('play') || t.includes('instrument'),
        animal:   t.includes('animal') || t.includes('dog') || t.includes('cat') || t.includes('bird') || t.includes('fish'),
        weather:  t.includes('weather') || t.includes('rain') || t.includes('sun') || t.includes('cloud') || t.includes('temperature'),
        money:    t.includes('money') || t.includes('economy') || t.includes('bank') || t.includes('invest') || t.includes('rich'),
        health:   t.includes('health') || t.includes('doctor') || t.includes('medic') || t.includes('exercise') || t.includes('sleep'),
        work:     t.includes('work') || t.includes('job') || t.includes('career') || t.includes('business'),
        travel:   t.includes('travel') || t.includes('country') || t.includes('city') || t.includes('visit'),
        hello:    /^(hello|hi|hey|greetings|good morning|good evening)/.test(t),
    };

    // Build response parts based on detected patterns
    const responses = [];

    // Special combo: meaning of life
    if (topics.meaning && topics.life) {
        responses.push(
            ['The', 'meaning', 'of', 'life', 'is', 'a', 'question', 'that', 'has', 'puzzled', 'philosophers', 'for', 'centuries', ',', 'and', 'each', 'person', 'must', 'ultimately', 'discover', 'their', 'own', 'answer.'],
            ['Many', 'would', 'say', '42', ',', 'but', 'in', 'truth', ',', 'meaning', 'is', 'something', 'we', 'create', 'through', 'our', 'connections', 'and', 'experiences.'],
            ['According', 'to', 'existentialist', 'philosophy', ',', 'life', 'has', 'no', 'inherent', 'meaning', '—', 'we', 'must', 'forge', 'it', 'ourselves.'],
        );
    } else if (topics.hello) {
        responses.push(
            ['Hello', '!', 'I', 'am', 'a', 'language', 'model', 'designed', 'to', 'generate', 'coherent', 'text', 'based', 'on', 'patterns', 'learned', 'from', 'training', 'data.'],
            ['Hi', 'there', '!', 'How', 'can', 'I', 'help', 'you', 'today', '?'],
        );
    } else if (topics.space) {
        responses.push(
            ['The', 'universe', 'is', 'approximately', '13.8', 'billion', 'years', 'old', 'and', 'continues', 'to', 'expand', 'at', 'an', 'accelerating', 'rate.'],
            ['Space', 'exploration', 'has', 'always', 'been', 'driven', 'by', 'humanity\'s', 'curiosity', 'about', 'what', 'lies', 'beyond', 'our', 'own', 'planet.'],
            ['The', 'observable', 'universe', 'contains', 'roughly', 'two', 'trillion', 'galaxies', ',', 'each', 'with', 'billions', 'of', 'stars.'],
        );
    } else if (topics.tech || topics.science) {
        responses.push(
            ['This', 'is', 'a', 'rapidly', 'evolving', 'field', 'that', 'continues', 'to', 'push', 'the', 'boundaries', 'of', 'what', 'we', 'thought', 'was', 'possible.'],
            ['The', 'key', 'insight', 'is', 'that', 'complex', 'systems', 'can', 'emerge', 'from', 'simple', 'rules', 'applied', 'at', 'massive', 'scale.'],
            ['Researchers', 'have', 'made', 'significant', 'breakthroughs', 'in', 'recent', 'years', ',', 'opening', 'up', 'entirely', 'new', 'possibilities.'],
        );
    } else if (topics.love) {
        responses.push(
            ['Love', 'is', 'perhaps', 'the', 'most', 'powerful', 'force', 'in', 'human', 'experience', ',', 'shaping', 'our', 'decisions', 'and', 'our', 'sense', 'of', 'self.'],
            ['The', 'deepest', 'connections', 'we', 'form', 'with', 'others', 'give', 'our', 'lives', 'richness', 'and', 'meaning.'],
        );
    } else if (topics.food) {
        responses.push(
            ['Food', 'is', 'not', 'just', 'sustenance', '—', 'it', 'is', 'culture', ',', 'memory', ',', 'and', 'art', 'all', 'combined', 'on', 'a', 'single', 'plate.'],
            ['The', 'best', 'recipes', 'are', 'often', 'the', 'simplest', ',', 'relying', 'on', 'fresh', 'ingredients', 'and', 'careful', 'technique.'],
        );
    } else if (topics.money) {
        responses.push(
            ['The', 'economy', 'is', 'a', 'complex', 'system', 'influenced', 'by', 'countless', 'factors', ',', 'from', 'policy', 'decisions', 'to', 'consumer', 'behavior.'],
            ['Financial', 'literacy', 'is', 'one', 'of', 'the', 'most', 'important', 'skills', 'a', 'person', 'can', 'develop', 'for', 'long-term', 'well-being.'],
        );
    } else if (topics.health) {
        responses.push(
            ['Good', 'health', 'is', 'the', 'foundation', 'upon', 'which', 'everything', 'else', 'in', 'life', 'is', 'built.'],
            ['Regular', 'exercise', ',', 'proper', 'nutrition', ',', 'and', 'adequate', 'sleep', 'form', 'the', 'three', 'pillars', 'of', 'physical', 'well-being.'],
        );
    } else if (topics.animal) {
        responses.push(
            ['Animals', 'are', 'remarkable', 'creatures', 'that', 'have', 'adapted', 'to', 'virtually', 'every', 'environment', 'on', 'Earth.'],
            ['The', 'bond', 'between', 'humans', 'and', 'animals', 'stretches', 'back', 'thousands', 'of', 'years', 'and', 'continues', 'to', 'enrich', 'our', 'lives.'],
        );
    } else if (topics.music) {
        responses.push(
            ['Music', 'has', 'the', 'unique', 'ability', 'to', 'transcend', 'language', 'and', 'connect', 'people', 'across', 'cultures', 'and', 'generations.'],
            ['The', 'beauty', 'of', 'music', 'lies', 'in', 'its', 'ability', 'to', 'express', 'emotions', 'that', 'words', 'alone', 'cannot', 'capture.'],
        );
    } else if (topics.history) {
        responses.push(
            ['History', 'teaches', 'us', 'that', 'the', 'patterns', 'of', 'the', 'past', 'often', 'repeat', 'themselves', 'in', 'unexpected', 'ways.'],
            ['Understanding', 'where', 'we', 'came', 'from', 'is', 'essential', 'to', 'understanding', 'where', 'we', 'are', 'going.'],
        );
    } else if (topics.weather) {
        responses.push(
            ['Weather', 'patterns', 'are', 'becoming', 'increasingly', 'unpredictable', 'as', 'our', 'climate', 'continues', 'to', 'change.'],
            ['The', 'atmosphere', 'is', 'a', 'chaotic', 'system', ',', 'making', 'long-term', 'forecasting', 'one', 'of', 'the', 'hardest', 'problems', 'in', 'science.'],
        );
    } else if (topics.work) {
        responses.push(
            ['The', 'nature', 'of', 'work', 'is', 'changing', 'rapidly', ',', 'driven', 'by', 'technology', 'and', 'shifting', 'cultural', 'values.'],
            ['Finding', 'meaningful', 'work', 'that', 'aligns', 'with', 'your', 'values', 'is', 'one', 'of', 'life\'s', 'greatest', 'challenges.'],
        );
    } else if (topics.travel) {
        responses.push(
            ['Travel', 'broadens', 'the', 'mind', 'and', 'challenges', 'our', 'assumptions', 'about', 'the', 'world.'],
            ['Every', 'place', 'has', 'its', 'own', 'story', ',', 'and', 'the', 'best', 'way', 'to', 'learn', 'it', 'is', 'by', 'experiencing', 'it', 'firsthand.'],
        );
    }

    // Generic fallbacks based on question patterns
    if (responses.length === 0) {
        if (isQuestion) {
            responses.push(
                ['That', 'is', 'an', 'interesting', 'question.', 'The', 'answer', 'depends', 'largely', 'on', 'the', 'context', 'and', 'perspective', 'from', 'which', 'you', 'approach', 'it.'],
                ['There', 'are', 'many', 'ways', 'to', 'think', 'about', 'this.', 'Some', 'experts', 'suggest', 'that', 'the', 'key', 'lies', 'in', 'understanding', 'the', 'underlying', 'principles.'],
                ['This', 'is', 'something', 'that', 'researchers', 'have', 'been', 'exploring', 'for', 'decades', ',', 'and', 'new', 'insights', 'continue', 'to', 'emerge.'],
            );
        } else {
            responses.push(
                ['This', 'is', 'a', 'topic', 'that', 'has', 'fascinated', 'thinkers', 'for', 'generations', 'and', 'continues', 'to', 'evolve', 'as', 'we', 'learn', 'more.'],
                ['Indeed', ',', 'there', 'is', 'much', 'to', 'be', 'said', 'about', 'this.', 'The', 'nuances', 'become', 'more', 'apparent', 'the', 'deeper', 'you', 'look.'],
                ['The', 'important', 'thing', 'to', 'remember', 'is', 'that', 'understanding', 'comes', 'gradually', ',', 'through', 'careful', 'observation', 'and', 'reflection.'],
                ['From', 'one', 'perspective', ',', 'this', 'seems', 'straightforward', '.', 'But', 'deeper', 'analysis', 'reveals', 'layers', 'of', 'complexity', 'that', 'are', 'worth', 'exploring.'],
            );
        }
    }

    // Pick deterministically based on input hash
    const h = hashStr(inputText);
    return responses[h % responses.length];
}

/** Generate "next word" predictions based on input text */
function generatePredictions(inputText) {
    const t = inputText.toLowerCase().trim();
    const h = hashStr(inputText);

    // Topic-aware top-word picking
    if (t.includes('meaning') && t.includes('life'))
        return [
            { word: 'The', prob: 0.21 }, { word: 'It', prob: 0.14 },
            { word: 'Many', prob: 0.11 }, { word: 'Life', prob: 0.09 },
            { word: 'A', prob: 0.08 }, { word: 'Perhaps', prob: 0.06 },
            { word: 'Some', prob: 0.05 }, { word: 'There', prob: 0.04 },
        ];
    if (/^(hello|hi|hey)/.test(t))
        return [
            { word: 'Hello', prob: 0.19 }, { word: 'Hi', prob: 0.16 },
            { word: 'I', prob: 0.12 }, { word: 'Hey', prob: 0.09 },
            { word: 'Welcome', prob: 0.07 }, { word: 'Thanks', prob: 0.06 },
            { word: 'Good', prob: 0.05 }, { word: 'Well', prob: 0.04 },
        ];

    // Generic but varied predictions — pick from different pools
    const pools = [
        [{ word:'The', prob:0.18 }, { word:'This', prob:0.13 }, { word:'It', prob:0.11 }, { word:'There', prob:0.09 }, { word:'In', prob:0.08 }, { word:'A', prob:0.07 }, { word:'That', prob:0.05 }, { word:'We', prob:0.04 }],
        [{ word:'That', prob:0.17 }, { word:'The', prob:0.14 }, { word:'This', prob:0.10 }, { word:'Indeed', prob:0.09 }, { word:'However', prob:0.08 }, { word:'From', prob:0.06 }, { word:'It', prob:0.05 }, { word:'One', prob:0.04 }],
        [{ word:'It', prob:0.20 }, { word:'The', prob:0.12 }, { word:'There', prob:0.10 }, { word:'This', prob:0.09 }, { word:'Many', prob:0.07 }, { word:'Some', prob:0.06 }, { word:'We', prob:0.05 }, { word:'A', prob:0.04 }],
    ];

    const pool = pools[h % pools.length];

    // Normalize
    const total = pool.reduce((a, b) => a + b.prob, 0);
    pool.forEach(p => p.prob /= total);

    return pool;
}


// ── Init / Navigation ──────────────────────────────────────

function buildDots() {
    progressDots.innerHTML = '';
    for (let i = 0; i < TOTAL_STEPS; i++) {
        const d = el('div', 'dot', String(i + 1));
        d.title = STEPS[i].title;
        progressDots.appendChild(d);
    }
}

function updateChrome() {
    stepLabel.textContent = `Step ${step + 1} / ${TOTAL_STEPS}`;
    progressBar.style.width = `${((step) / (TOTAL_STEPS - 1)) * 100}%`;
    const dots = progressDots.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === step);
        dots[i].classList.toggle('done', i < step);
    }
    stageTitle.textContent = STEPS[step].title;
    explanationTx.innerHTML = STEPS[step].explain;
    prevBtn.disabled = step === 0;
    nextBtn.disabled = true;
    nextBtn.querySelector('span').textContent = step === TOTAL_STEPS - 1 ? 'Finish' : 'Next Step';
}

function enableNext() {
    nextBtn.disabled = false;
}

function goToStep(n) {
    if (n < 0 || n >= TOTAL_STEPS) return;
    skipRequested = true;
    setTimeout(() => {
        skipRequested = false;
        step = n;
        renderStep();
    }, 50);
}

function renderStep() {
    stage.innerHTML = '';
    stage.className = 'stage';
    updateChrome();
    explanation.classList.add('collapsed');
    animating = true;
    STEPS[step].render().then(() => { animating = false; });
}

// ── Event listeners ────────────────────────────────────────
startBtn.addEventListener('click', () => {
    const t = userInput.value.trim();
    if (!t) return;
    data.text = t;
    data.tokens = tokenize(t);
    data.ids = data.tokens.map(getID);
    data.selectedIdx = 0;
    landing.classList.add('hidden');
    walkthrough.classList.remove('hidden');
    buildDots();
    step = 0;
    renderStep();
});

userInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBtn.click(); });

nextBtn.addEventListener('click', () => {
    if (step < TOTAL_STEPS - 1) goToStep(step + 1);
    else {
        walkthrough.classList.add('hidden');
        landing.classList.remove('hidden');
    }
});

prevBtn.addEventListener('click', () => { if (step > 0) goToStep(step - 1); });

restartBtn.addEventListener('click', () => {
    skipRequested = true;
    setTimeout(() => {
        skipRequested = false;
        walkthrough.classList.add('hidden');
        landing.classList.remove('hidden');
    }, 50);
});

skipBtn.addEventListener('click', () => {
    skipRequested = true;
    setTimeout(() => {
        skipRequested = false;
        renderStep();
        setTimeout(enableNext, 60);
    }, 60);
});

infoBtn.addEventListener('click', () => { explanation.classList.toggle('collapsed'); });

// ── STEP RENDERERS ─────────────────────────────────────────

// ---- Step 0: Raw Text ----
async function renderRawText() {
    stage.classList.add('col');

    const note = el('div', 'info-box');
    note.style.marginBottom = '16px';
    note.innerHTML = 'The model receives your input as a <b>sequence of Unicode code points</b>. Each character is a number — the letter "A" is 65, a space is 32, etc. The model has no concept of words or grammar at this stage.';
    stage.appendChild(note);

    const row = el('div', '', '');
    row.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;font-size:1.3rem;min-height:60px;';
    stage.appendChild(row);

    const chars = data.text.split('');
    if (skipRequested) {
        chars.forEach((ch, i) => {
            const s = el('span', ch === ' ' ? 'char space' : 'char', ch === ' ' ? '·' : ch);
            s.style.opacity = '1';
            tip(s, `Character: "${ch === ' ' ? 'space' : ch}" — Unicode: U+${ch.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0')} (${ch.charCodeAt(0)})`, 'below');
            row.appendChild(s);
        });
        enableNext();
        return;
    }

    for (let i = 0; i < chars.length; i++) {
        if (skipRequested) break;
        const ch = chars[i];
        const s = el('span', ch === ' ' ? 'char space' : 'char', ch === ' ' ? '·' : ch);
        tip(s, `Character: "${ch === ' ' ? 'space' : ch}" — Unicode: U+${ch.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0')} (${ch.charCodeAt(0)})`, 'below');
        row.appendChild(s);
        await skippableSleep(35);
    }
    const cursor = el('span', 'char cursor');
    row.appendChild(cursor);
    enableNext();
}

// ---- Step 1: Tokenization ----
async function renderTokenization() {
    stage.classList.add('col');

    const rawRow = el('div', 'status', `"${data.text}"`);
    rawRow.style.cssText = 'margin-bottom:12px;color:var(--text3);font-size:0.9rem;';
    stage.appendChild(rawRow);

    const arrowD = el('div', 'arrow-down', '↓ BPE Tokenizer');
    tip(arrowD, 'Byte-Pair Encoding: iteratively merges the most frequent character pairs. Trained on a large corpus — GPT-2 used ~40GB of internet text to learn 50,257 merge rules.', 'below');
    stage.appendChild(arrowD);

    const tokenRow = el('div', '');
    tokenRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px;';
    stage.appendChild(tokenRow);

    if (skipRequested) {
        data.tokens.forEach((t, i) => {
            const d = el('div', 'token', displayToken(t));
            d.style.opacity = '1';
            d.style.animation = 'none';
            const raw = t.startsWith('Ġ') ? `Ġ${displayToken(t)}` : t;
            tip(d, `Token: "${displayToken(t)}" — Internal: "${raw}". ${t.startsWith('Ġ') ? 'The Ġ means this token had a space before it.' : 'No leading space.'} Token #${i + 1} of ${data.tokens.length}.`);
            tokenRow.appendChild(d);
        });
        enableNext();
        return;
    }

    for (let i = 0; i < data.tokens.length; i++) {
        if (skipRequested) break;
        const t = data.tokens[i];
        const d = el('div', 'token', displayToken(t));
        d.style.animationDelay = `${i * 0.05}s`;
        const raw = t.startsWith('Ġ') ? `Ġ${displayToken(t)}` : t;
        tip(d, `Token: "${displayToken(t)}" — Internal: "${raw}". ${t.startsWith('Ġ') ? 'The Ġ means this token had a space before it.' : 'No leading space.'} Token #${i + 1} of ${data.tokens.length}.`);
        tokenRow.appendChild(d);
        await skippableSleep(120);
    }
    enableNext();
}

// ---- Step 2: Vocab Lookup ----
async function renderVocabLookup() {
    stage.classList.add('col');

    const note = el('div', 'info-box');
    note.style.marginBottom = '12px';
    note.innerHTML = 'Each token is matched against a <b>fixed vocabulary of 50,257 entries</b>. The vocabulary was built during training and never changes. Every token maps to exactly one integer ID.';
    stage.appendChild(note);

    const tokenRow = el('div', '');
    tokenRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;';
    stage.appendChild(tokenRow);

    const elements = [];
    data.tokens.forEach((t, i) => {
        const d = el('div', 'token', displayToken(t));
        d.style.opacity = '1';
        d.style.animation = 'none';
        tip(d, `Token "${displayToken(t)}" → will be looked up in the vocabulary table to find its unique ID number.`);
        tokenRow.appendChild(d);
        elements.push(d);
    });

    await skippableSleep(400);

    if (skipRequested) {
        tokenRow.innerHTML = '';
        data.ids.forEach((id, i) => {
            const d = el('div', 'tid', String(id));
            d.style.opacity = '1';
            d.style.animation = 'none';
            tip(d, `ID ${id} — this integer uniquely identifies the token "${displayToken(data.tokens[i])}" in GPT-2's vocabulary. The model only works with these numbers from here on.`);
            tokenRow.appendChild(d);
        });
        enableNext();
        return;
    }

    for (let i = 0; i < data.tokens.length; i++) {
        if (skipRequested) break;
        const tok = elements[i];
        tok.classList.add('highlight');

        const popup = el('div', 'vocab-popup');
        const id = data.ids[i];
        const clean = displayToken(data.tokens[i]).replace(/</g,'&lt;').replace(/>/g,'&gt;');
        popup.innerHTML = `
            <div class="vocab-row"><span>…</span><span>…</span></div>
            <div class="vocab-row"><span>token_${id-1}</span><span>${id-1}</span></div>
            <div class="vocab-row hl"><span>"${clean}"</span><span>${id}</span></div>
            <div class="vocab-row"><span>token_${id+1}</span><span>${id+1}</span></div>
            <div class="vocab-row"><span>…</span><span>…</span></div>
        `;
        const rect = tok.getBoundingClientRect();
        const stageRect = stage.closest('.stage-wrap').getBoundingClientRect();
        popup.style.left = `${rect.left - stageRect.left + rect.width/2 - 90}px`;
        popup.style.top = `${rect.top - stageRect.top - 140}px`;
        stage.closest('.stage-wrap').appendChild(popup);

        await skippableSleep(600);

        tok.className = 'tid';
        tok.textContent = id;
        tok.style.opacity = '1';
        tok.style.animation = 'flip 0.35s ease forwards';
        tok.removeAttribute('data-tip');
        tip(tok, `ID ${id} — uniquely represents "${clean}" in the vocabulary. The model only sees this number now.`);

        popup.remove();
        await skippableSleep(150);
    }
    enableNext();
}

// ---- Step 3: Token Embeddings ----
async function renderTokenEmbeddings() {
    stage.classList.add('col');
    const dim = data.dim;

    const infoBox = el('div', 'info-box');
    infoBox.innerHTML = `
        <b>Embedding Matrix W<sub>E</sub></b> — Shape: <b>50,257 × 768</b><br>
        Each Token ID selects one row → a ${dim}-dim vector (simplified from 768).
        These vectors are <b>learned during training</b> — similar words (like "king" and "queen") end up with similar vectors.
    `;
    tip(infoBox, 'This giant matrix has ~39 million parameters just for embeddings! Each of the 50,257 tokens has its own 768-dimensional vector that was optimized during training.', 'below');
    stage.appendChild(infoBox);

    await skippableSleep(300);

    const grid = el('div', '');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:16px;';
    stage.appendChild(grid);

    const allIds = data.ids;

    function makeEmbGroup(id, i) {
        const group = el('div', '');
        group.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;';
        const idEl = el('div', 'tid', String(id));
        idEl.style.cssText = 'opacity:1;animation:none;font-size:0.8rem;';
        tip(idEl, `Token ID ${id} — used as an index to look up row ${id} in the embedding matrix.`);
        group.appendChild(idEl);
        const arw = el('div', 'arrow-down', '↓');
        tip(arw, `Matrix lookup: W_E[${id}] → a ${dim}-dimensional vector (768 in real GPT-2).`, 'below');
        arw.style.fontSize = '0.9rem';
        group.appendChild(arw);
        const v = makeVecEl(pseudoVec(id, dim), null, `This ${dim}-dim vector represents the semantic meaning of token ${id}. "${displayToken(data.tokens[i])}" — In real GPT-2, this would be 768 numbers.`);
        v.style.opacity = '1';
        v.style.animation = 'none';
        group.appendChild(v);
        return group;
    }

    if (skipRequested) {
        allIds.forEach((id, i) => grid.appendChild(makeEmbGroup(id, i)));
        enableNext();
        return;
    }

    for (let i = 0; i < allIds.length; i++) {
        if (skipRequested) break;
        grid.appendChild(makeEmbGroup(allIds[i], i));
        await skippableSleep(200);
    }
    enableNext();
}

// ---- Step 4: Positional Encoding ----
async function renderPositionalEncoding() {
    stage.classList.add('col');
    const dim = data.dim;

    const infoBox = el('div', 'info-box');
    infoBox.innerHTML = `
        <b>Positional Embedding Table</b> — Shape: <b>1,024 × 768</b><br>
        GPT-2 supports up to 1,024 positions. Each position gets a unique learned vector
        that tells the model <i>where</i> this token sits in the sequence.
    `;
    tip(infoBox, 'Without positional info, "the cat sat on the mat" and "mat the on sat cat the" would look identical to the model! Position embeddings solve this.', 'below');
    stage.appendChild(infoBox);

    await skippableSleep(300);

    const grid = el('div', '');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:16px;';
    stage.appendChild(grid);

    const tokens = data.tokens;

    function makePosGroup(t, i) {
        const group = el('div', '');
        group.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;';
        const lbl = el('div', '', `pos ${i}`);
        lbl.style.cssText = 'font-size:0.75rem;color:var(--text3);font-family:var(--mono);';
        tip(lbl, `Position ${i} in the sequence (0-indexed). GPT-2 can handle up to position 1,023.`, 'below');
        group.appendChild(lbl);
        const tokLbl = el('div', 'token', displayToken(t));
        tokLbl.style.cssText = 'opacity:1;animation:none;font-size:0.8rem;padding:4px 8px;';
        tip(tokLbl, `"${displayToken(t)}" sits at position ${i}. Its positional vector encodes this exact location.`);
        group.appendChild(tokLbl);
        const arw = el('div', 'arrow-down', '↓');
        arw.style.fontSize = '0.9rem';
        group.appendChild(arw);
        const v = makeVecEl(positionalVec(i, dim), null, `Positional vector for position ${i}. These values encode "where" in the sequence, independent of "what" the token means.`);
        v.style.cssText = 'opacity:1;animation:none;border-color:var(--cyan);';
        group.appendChild(v);
        return group;
    }

    if (skipRequested) {
        tokens.forEach((t, i) => grid.appendChild(makePosGroup(t, i)));
        enableNext();
        return;
    }

    for (let i = 0; i < tokens.length; i++) {
        if (skipRequested) break;
        grid.appendChild(makePosGroup(tokens[i], i));
        await skippableSleep(180);
    }
    enableNext();
}

// ---- Step 5: Combined Embeddings ----
async function renderCombinedEmbeddings() {
    stage.classList.add('col');
    const dim = data.dim;
    const idx = Math.min(data.selectedIdx, data.tokens.length - 1);
    const id = data.ids[idx];
    const tokVec = pseudoVec(id, dim);
    const posVec = positionalVec(idx, dim);
    const combined = addVec(tokVec, posVec);

    const statusEl = el('div', 'status', `Combining embeddings for token "${displayToken(data.tokens[idx])}" (pos ${idx})`);
    stage.appendChild(statusEl);

    await skippableSleep(300);

    const row = el('div', '');
    row.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:16px;';
    stage.appendChild(row);

    const tvEl = makeVecEl(tokVec, 'Token Emb', `Token embedding for "${displayToken(data.tokens[idx])}" (ID: ${id}). Encodes WHAT this word means.`);
    const pvEl = makeVecEl(posVec, 'Pos Emb', `Positional embedding for position ${idx}. Encodes WHERE this token sits in the sequence.`);
    pvEl.style.borderColor = 'var(--cyan)';
    const plus = el('div', 'op', '+');
    tip(plus, 'Element-wise addition: each dimension of the token vector is added to the corresponding dimension of the position vector.', 'below');
    const eq = el('div', 'op', '=');
    const sumEl = makeVecEl(combined, 'Input', `Combined embedding: carries both MEANING and POSITION. This vector is the actual input to the transformer stack.`);
    sumEl.style.borderColor = 'var(--green)';
    sumEl.style.boxShadow = '0 0 12px var(--green-glow)';

    if (skipRequested) {
        [tvEl, pvEl, sumEl].forEach(e => { e.style.opacity = '1'; e.style.animation = 'none'; });
        row.append(tvEl, plus, pvEl, eq, sumEl);
        enableNext();
        return;
    }

    row.appendChild(tvEl);
    await skippableSleep(400);
    row.appendChild(plus);
    row.appendChild(pvEl);
    await skippableSleep(500);
    row.appendChild(eq);
    await skippableSleep(300);
    row.appendChild(sumEl);

    await skippableSleep(400);
    const allRow = el('div', '');
    allRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:24px;';
    stage.appendChild(allRow);
    const allLabel = el('div', 'status', 'All tokens → combined embeddings ready for the transformer:');
    allLabel.style.cssText += 'margin-bottom:8px;';
    stage.insertBefore(allLabel, allRow);

    data.tokens.forEach((t, i) => {
        const tid = data.ids[i];
        const cv = addVec(pseudoVec(tid, dim), positionalVec(i, dim));
        const g = el('div', '');
        g.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;';
        const tl = el('div', '', displayToken(t));
        tl.style.cssText = 'font-size:0.75rem;color:var(--text3);';
        g.appendChild(tl);
        const ve = makeVecEl(cv, null, `Combined embedding for "${displayToken(t)}" at position ${i}. This is the input vector that enters layer 1 of the transformer.`);
        ve.style.cssText = 'opacity:1;animation:none;border-color:var(--green);';
        ve.style.fontSize = '0.65rem';
        g.appendChild(ve);
        allRow.appendChild(g);
    });

    enableNext();
}

// ---- Step 6: Transformer Block Architecture ----
async function renderTransformerBlock() {
    stage.classList.add('col');

    const diagram = el('div', 'block-diagram');
    stage.appendChild(diagram);

    const boxes = [
        { text: 'Input Embeddings', dim: `(${data.tokens.length} × 768)`,
          tip: `The combined token + position embeddings for all ${data.tokens.length} tokens. Each is a 768-dimensional vector.` },
        { text: 'Layer Norm', dim: '',
          tip: 'Layer Normalization: normalizes each vector to have zero mean and unit variance. Stabilizes training and helps gradients flow. Applied BEFORE attention in GPT-2 (pre-norm architecture).' },
        { text: 'Multi-Head Self-Attention', dim: '12 heads × d_k=64',
          tip: '12 parallel attention heads, each with key/query/value dimension of 64. Together they span the full 768 dimensions (12 × 64 = 768). Each head can learn different relationship patterns.' },
        { text: '+ Residual Connection', dim: '',
          tip: 'Skip connection: the original input is ADDED to the attention output. This lets gradients flow directly through the network and prevents information loss. Critical for training deep networks.' },
        { text: 'Layer Norm', dim: '',
          tip: 'Second Layer Normalization, applied before the feed-forward network. Same operation as before — normalize to zero mean, unit variance.' },
        { text: 'Feed-Forward (MLP)', dim: '768 → 3072 → 768',
          tip: 'Two linear layers with GELU activation between them. Expands to 4× the dimension (3072), processes, then contracts back. This is where "thinking" happens — non-linear transformations of the gathered context.' },
        { text: '+ Residual Connection', dim: '',
          tip: 'Second skip connection: the input to the FFN is added to its output. Same principle — preserve information and enable gradient flow.' },
    ];

    if (skipRequested) {
        boxes.forEach(b => {
            const box = el('div', 'block-box', `<div>${b.text}</div><div class="dim">${b.dim}</div>`);
            tip(box, b.tip, 'below');
            diagram.appendChild(box);
            const arr = el('div', 'arrow-down', '↓');
            diagram.appendChild(arr);
        });
        const rep = el('div', 'block-repeat', '× 12 layers');
        tip(rep, 'This entire block is repeated 12 times. Each layer can refine the representations further. Early layers capture basic syntax, deeper layers capture complex semantics.', 'below');
        diagram.appendChild(rep);
        enableNext();
        return;
    }

    for (let i = 0; i < boxes.length; i++) {
        if (skipRequested) break;
        const b = boxes[i];
        const box = el('div', 'block-box glow', `<div>${b.text}</div><div class="dim">${b.dim}</div>`);
        tip(box, b.tip, 'below');
        diagram.appendChild(box);
        await skippableSleep(350);
        box.classList.remove('glow');
        if (i < boxes.length - 1) {
            const arr = el('div', 'arrow-down', '↓');
            diagram.appendChild(arr);
            await skippableSleep(150);
        }
    }
    await skippableSleep(300);
    const arr = el('div', 'arrow-down', '↓');
    diagram.appendChild(arr);
    const rep = el('div', 'block-repeat', '× 12 layers');
    tip(rep, 'This entire block is repeated 12 times. Each layer can refine the representations further. Early layers capture basic syntax, deeper layers capture complex semantics.', 'below');
    diagram.appendChild(rep);

    enableNext();
}

// ---- Step 7: Self-Attention ----
async function renderAttention() {
    stage.classList.add('col');
    const tokens = data.tokens.slice(0, 8); // cap for visual clarity
    const n = tokens.length;

    // QKV explanation
    const qkvRow = el('div', 'qkv-container');
    stage.appendChild(qkvRow);

    const qBox = el('div', 'qkv-box');
    qBox.innerHTML = `<div class="qkv-label q">Q (Query)</div><div style="font-size:0.75rem;color:var(--text3);max-width:140px;text-align:center;margin-top:4px;">"What am I looking for?"</div>`;
    tip(qBox, 'Query: derived by multiplying the input vector by weight matrix W_Q. Represents what information this token is searching for. Shape per head: (seq_len × 64).', 'below');
    const kBox = el('div', 'qkv-box');
    kBox.innerHTML = `<div class="qkv-label k">K (Key)</div><div style="font-size:0.75rem;color:var(--text3);max-width:140px;text-align:center;margin-top:4px;">"What do I contain?"</div>`;
    tip(kBox, 'Key: derived by multiplying by W_K. Represents what information this token offers to others. When a Query matches a Key well, the attention score is high.', 'below');
    const vBox = el('div', 'qkv-box');
    vBox.innerHTML = `<div class="qkv-label v">V (Value)</div><div style="font-size:0.75rem;color:var(--text3);max-width:140px;text-align:center;margin-top:4px;">"Here is my information"</div>`;
    tip(vBox, 'Value: derived by multiplying by W_V. Contains the actual information that will be passed along. The attention weights determine how much of each Value gets mixed in.', 'below');
    qkvRow.append(qBox, kBox, vBox);

    await skippableSleep(500);

    const heatLabel = el('div', 'status', 'Attention Scores — softmax(Q·Kᵀ / √64)');
    heatLabel.style.marginTop = '16px';
    tip(heatLabel, 'The dot product Q·Kᵀ measures similarity between queries and keys. Dividing by √64 prevents the values from getting too large. Softmax ensures each row sums to 1 (probability distribution).', 'below');
    stage.appendChild(heatLabel);

    const maskNote = el('div', '', '');
    maskNote.style.cssText = 'font-size:0.75rem;color:var(--text3);text-align:center;margin-bottom:8px;';
    maskNote.textContent = 'Causal mask: each token only attends to previous tokens + itself';
    tip(maskNote, 'GPT-2 is autoregressive — it generates text left to right. The causal mask prevents "cheating" by blocking access to future tokens. This is why the upper-right triangle is empty.', 'below');
    stage.appendChild(maskNote);

    const cols = n + 1;
    const grid = el('div', 'attn-grid');
    grid.style.gridTemplateColumns = `60px repeat(${n}, 1fr)`;
    grid.style.maxWidth = `${60 + n * 52}px`;
    stage.appendChild(grid);

    // Header row
    grid.appendChild(el('div', '')); // corner
    tokens.forEach((t, j) => {
        const lbl = el('div', 'attn-label', displayToken(t));
        tip(lbl, `Key token: "${displayToken(t)}" (position ${j}). This column shows how much each row-token attends to this token.`, 'below');
        grid.appendChild(lbl);
    });

    // Pre-compute all attention weights
    const allWeights = [];
    for (let i = 0; i < n; i++) {
        const raw = [];
        for (let j = 0; j <= i; j++) {
            const dist = Math.abs(i - j);
            let w = 1 / (dist + 1);
            // Use deterministic "randomness" instead of Math.random()
            if (j === i) w = 0.6 + (Math.sin(i * 7.31 + j * 3.17) * 0.5 + 0.5) * 0.3;
            raw.push(w);
        }
        const sum = raw.reduce((a, b) => a + b, 0);
        allWeights.push(raw.map(w => w / sum));
    }

    const cells = [];
    for (let i = 0; i < n; i++) {
        const rl = el('div', 'attn-label side', displayToken(tokens[i]));
        tip(rl, `Query token: "${displayToken(tokens[i])}" (position ${i}). This row shows which tokens it pays attention to.`);
        grid.appendChild(rl);
        const rowCells = [];
        for (let j = 0; j < n; j++) {
            const cell = el('div', 'attn-cell');
            if (j > i) {
                cell.style.background = 'rgba(255,255,255,0.02)';
                tip(cell, `MASKED: "${displayToken(tokens[i])}" cannot see "${displayToken(tokens[j])}" because it appears later in the sequence. This enforces left-to-right generation.`, 'below');
            } else {
                cell.style.background = 'rgba(99,102,241,0.05)';
                const pct = (allWeights[i][j] * 100).toFixed(1);
                tip(cell, `Attention: "${displayToken(tokens[i])}" → "${displayToken(tokens[j])}" = ${pct}%. ${j === i ? 'Self-attention is often high — a token usually finds itself very relevant.' : `Score based on how relevant "${displayToken(tokens[j])}" is to "${displayToken(tokens[i])}".`}`, 'below');
            }
            grid.appendChild(cell);
            rowCells.push({ el: cell, row: i, col: j, masked: j > i });
        }
        cells.push(rowCells);
    }

    await skippableSleep(300);

    for (let i = 0; i < n; i++) {
        const norm = allWeights[i];
        for (let j = 0; j <= i; j++) {
            const alpha = Math.min(norm[j] * 2.5, 1);
            const cell = cells[i][j].el;
            if (skipRequested) {
                cell.style.background = `rgba(99,102,241,${alpha})`;
                cell.style.transition = 'none';
            } else {
                cell.style.background = `rgba(99,102,241,${alpha})`;
            }
        }
        if (!skipRequested) await skippableSleep(180);
    }

    enableNext();
}

// ---- Step 8: Feed-Forward Network ----
async function renderFFN() {
    stage.classList.add('col');

    const statusEl = el('div', 'status', 'Each token passes independently through the MLP');
    stage.appendChild(statusEl);

    await skippableSleep(200);

    const row = el('div', '');
    row.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:12px;';
    stage.appendChild(row);

    const dim = data.dim;
    const id = data.ids[0];
    const inputVec = pseudoVec(id, dim);
    const inEl = makeVecEl(inputVec, 'Input (768)', `The attention-enriched vector for "${displayToken(data.tokens[0])}". Now contains context from all tokens it attended to.`);

    const arrow1 = el('div', 'arrow', '→');

    const layer1 = el('div', 'ffn-layer');
    layer1.innerHTML = `<div class="ffn-label">Linear₁</div><div class="ffn-sub">768 → 3072</div>`;
    tip(layer1, 'First linear projection: multiplies the 768-dim input by a (768×3072) weight matrix + bias. Expands the representation to 4× its original size, giving the network more "room to think".', 'below');
    const nodes1 = el('div', 'ffn-nodes');
    for (let i = 0; i < 12; i++) {
        const n = el('div', 'ffn-node');
        tip(n, `Neuron ${i+1} of 3,072. Each neuron computes a weighted sum of the 768 inputs plus a bias term.`, 'below');
        nodes1.appendChild(n);
    }
    layer1.appendChild(nodes1);

    const arrow2 = el('div', 'arrow', '→');

    const gelu = el('div', 'ffn-layer');
    gelu.innerHTML = `<div class="ffn-label">GELU</div><div class="ffn-sub">activation</div>`;
    tip(gelu, 'GELU (Gaussian Error Linear Unit): a smooth, non-linear activation function. Unlike ReLU, it allows small negative values through. Formula: x × Φ(x), where Φ is the Gaussian CDF. This non-linearity is what gives the network its "thinking" power.', 'below');
    const nodes2 = el('div', 'ffn-nodes');
    for (let i = 0; i < 12; i++) {
        const n = el('div', 'ffn-node');
        tip(n, `After GELU: negative inputs are mostly squashed to ~0, positive inputs pass through roughly unchanged. This creates sparsity in the representation.`, 'below');
        nodes2.appendChild(n);
    }
    gelu.appendChild(nodes2);

    const arrow3 = el('div', 'arrow', '→');

    const layer2 = el('div', 'ffn-layer');
    layer2.innerHTML = `<div class="ffn-label">Linear₂</div><div class="ffn-sub">3072 → 768</div>`;
    tip(layer2, 'Second linear projection: compresses back from 3,072 dimensions to 768. Combines the non-linear features into a compact representation. The expand→contract pattern is called a "bottleneck".', 'below');
    const nodes3 = el('div', 'ffn-nodes');
    for (let i = 0; i < 8; i++) {
        const n = el('div', 'ffn-node');
        tip(n, `Output neuron ${i+1} of 768. Combines information from all 3,072 intermediate neurons.`, 'below');
        nodes3.appendChild(n);
    }
    layer2.appendChild(nodes3);

    const arrow4 = el('div', 'arrow', '→');

    const outVec = pseudoVec(id + 7, dim);
    const outEl = makeVecEl(outVec, 'Output (768)', `The transformed vector — now contains the "thought-through" representation. Different from the input because the MLP has applied non-linear transformations.`);
    outEl.style.borderColor = 'var(--orange)';

    if (skipRequested) {
        [inEl, outEl].forEach(e => { e.style.opacity = '1'; e.style.animation = 'none'; });
        row.append(inEl, arrow1, layer1, arrow2, gelu, arrow3, layer2, arrow4, outEl);
        row.querySelectorAll('.ffn-node').forEach(nd => nd.classList.add('lit'));
        enableNext();
        return;
    }

    row.appendChild(inEl);
    await skippableSleep(300);
    row.append(arrow1, layer1);
    await skippableSleep(400);

    layer1.classList.add('active');
    for (const node of nodes1.children) { node.classList.add('lit'); await skippableSleep(30); }
    await skippableSleep(200);
    layer1.classList.remove('active');

    row.append(arrow2, gelu);
    await skippableSleep(300);

    gelu.classList.add('active');
    for (const node of nodes2.children) { node.classList.add('lit'); await skippableSleep(30); }
    await skippableSleep(200);
    gelu.classList.remove('active');

    row.append(arrow3, layer2);
    await skippableSleep(300);

    layer2.classList.add('active');
    for (const node of nodes3.children) { node.classList.add('lit'); await skippableSleep(30); }
    await skippableSleep(200);
    layer2.classList.remove('active');

    row.append(arrow4, outEl);

    await skippableSleep(400);
    const addNorm = el('div', 'info-box');
    addNorm.style.maxWidth = '500px';
    addNorm.style.marginTop = '16px';
    addNorm.innerHTML = `<b>+ Residual Connection & Layer Norm</b><br>The output is added back to the input (skip connection), then normalized. This helps gradients flow and stabilizes training.`;
    tip(addNorm, 'Residual connections are crucial — without them, deep networks (12+ layers) become very hard to train. The gradient can flow directly through the skip connection, avoiding the vanishing gradient problem.', 'below');
    stage.appendChild(addNorm);

    enableNext();
}

// ---- Step 9: ×12 Layers ----
async function renderLayerStack() {
    stage.classList.add('col');

    const statusEl = el('div', 'status', 'Processing through all 12 transformer layers...');
    stage.appendChild(statusEl);

    const layerDescriptions = [
        'Captures basic token relationships and syntax patterns',
        'Identifies simple phrases and word groupings',
        'Learns part-of-speech and grammatical roles',
        'Builds short-range dependency understanding',
        'Recognizes semantic clusters and word senses',
        'Resolves ambiguities using broader context',
        'Tracks long-range dependencies across the sequence',
        'Integrates discourse-level meaning',
        'Refines contextual representations further',
        'Builds abstract semantic features',
        'Prepares output-specific representations',
        'Final refinement before prediction head',
    ];

    const stack = el('div', 'layer-stack');
    stack.style.marginTop = '12px';
    stage.appendChild(stack);

    const bars = [];
    for (let i = 0; i < 12; i++) {
        const bar = el('div', 'layer-bar');
        bar.innerHTML = `
            <span class="num">${i + 1}</span>
            <span class="lbl">Attention → FFN → Add & Norm</span>
            <span class="indicator"></span>
        `;
        tip(bar, `Layer ${i+1}: ${layerDescriptions[i]}. Each layer has ~7M parameters (attention weights + FFN weights + layer norm parameters).`, 'below');
        stack.appendChild(bar);
        bars.push(bar);
    }

    await skippableSleep(300);

    if (skipRequested) {
        bars.forEach(b => b.classList.add('done'));
        statusEl.textContent = 'All 12 layers complete!';
        enableNext();
        return;
    }

    for (let i = 0; i < 12; i++) {
        if (skipRequested) {
            bars.slice(i).forEach(b => b.classList.add('done'));
            break;
        }
        bars[i].classList.add('processing');
        statusEl.textContent = `Layer ${i + 1} / 12: ${layerDescriptions[i]}`;
        await skippableSleep(350);
        bars[i].classList.remove('processing');
        bars[i].classList.add('done');
    }
    statusEl.textContent = 'All 12 layers complete! Output hidden states ready.';
    enableNext();
}

// ---- Step 10: Output ----
async function renderOutput() {
    stage.classList.add('col');

    // Pipeline: LayerNorm → Linear → Softmax
    const pipeline = el('div', '');
    pipeline.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px;flex-wrap:wrap;';
    stage.appendChild(pipeline);

    const pipeBoxes = [
        { text: 'Hidden State', sub: '(768)',
          tip: 'The output from layer 12 — a 768-dimensional vector for each token. We only need the LAST token\'s hidden state for next-token prediction.' },
        { text: 'Layer Norm', sub: '',
          tip: 'Final layer normalization applied to the hidden state. Ensures the values are well-scaled before the output projection.' },
        { text: 'Linear', sub: '768→50,257',
          tip: 'The "unembedding" matrix: projects from 768 dimensions to vocabulary size (50,257). Often shares weights with the embedding matrix (weight tying). Produces raw logits — one score per vocabulary token.' },
        { text: 'Softmax', sub: '',
          tip: 'Converts raw logits into a probability distribution. Each of the 50,257 tokens gets a probability between 0 and 1, and they all sum to 1. Formula: softmax(x_i) = e^(x_i) / Σe^(x_j).' },
    ];

    pipeBoxes.forEach((b, i) => {
        if (i > 0) pipeline.appendChild(el('div', 'arrow', '→'));
        const box = el('div', 'ffn-layer');
        box.style.minWidth = '90px';
        box.innerHTML = `<div class="ffn-label">${b.text}</div>${b.sub ? `<div class="ffn-sub">${b.sub}</div>` : ''}`;
        tip(box, b.tip, 'below');
        pipeline.appendChild(box);
    });

    await skippableSleep(400);

    const probLabel = el('div', 'status', 'Top predicted next tokens:');
    probLabel.style.margin = '12px 0 8px';
    tip(probLabel, 'Out of 50,257 possible tokens, these are the ones with the highest probability. In practice, the model might use "top-k" or "nucleus" sampling to introduce controlled randomness.', 'below');
    stage.appendChild(probLabel);

    // Use the smart prediction generator
    const predictions = generatePredictions(data.text);

    // Normalize
    const total = predictions.reduce((a, b) => a + b.prob, 0);
    predictions.forEach(p => p.prob /= total);

    const probContainer = el('div', '');
    probContainer.style.cssText = 'width:100%;max-width:600px;';
    stage.appendChild(probContainer);

    predictions.forEach((p, i) => {
        const pRow = el('div', 'prob-row');
        const word = el('div', 'prob-word', p.word);
        const barBg = el('div', 'prob-bar-bg');
        const bar = el('div', `prob-bar ${i === 0 ? 'top' : 'other'}`);
        barBg.appendChild(bar);
        const pct = el('div', 'prob-pct', (p.prob * 100).toFixed(1) + '%');

        tip(pRow, `"${p.word}" — probability: ${(p.prob * 100).toFixed(1)}%. ${i === 0 ? 'This is the top prediction — the model considers this the most likely next token given the context.' : `Ranked #${i+1}. The model assigns a non-zero probability to thousands of tokens, but most are very unlikely.`}`, 'below');

        pRow.append(word, barBg, pct);
        probContainer.appendChild(pRow);

        setTimeout(() => { bar.style.width = `${p.prob * 100}%`; }, skipRequested ? 0 : 100 + i * 100);
    });

    await skippableSleep(800);

    // Generation output
    const genLabel = el('div', 'status', 'Autoregressive generation — feeding predicted token back:');
    genLabel.style.margin = '20px 0 8px';
    tip(genLabel, 'GPT-2 generates text one token at a time. After predicting a token, it appends it to the input and runs the ENTIRE process again (all 12 layers!) to predict the next token. This is why generation is slow — each new token requires a full forward pass.', 'below');
    stage.appendChild(genLabel);

    const genBox = el('div', 'gen-output');
    tip(genBox, 'The green text is newly generated. Each word required a complete forward pass through the model. In practice, techniques like KV-caching make this much faster by reusing computations.', 'below');
    const promptSpan = el('span', 'gen-prompt', data.text + ' ');
    const newSpan = el('span', 'gen-new', '');
    const cursorSpan = el('span', 'gen-cursor');
    genBox.append(promptSpan, newSpan, cursorSpan);
    stage.appendChild(genBox);

    // Use the smart continuation generator
    const generated = generateContinuation(data.text);

    if (skipRequested) {
        newSpan.textContent = generated.join(' ').replace(/ ([.,!?;:])/g, '$1');
        cursorSpan.remove();
        enableNext();
        return;
    }

    for (let i = 0; i < generated.length; i++) {
        if (skipRequested) {
            const rest = generated.slice(i);
            newSpan.textContent += rest.join(' ').replace(/ ([.,!?;:])/g, '$1');
            break;
        }
        const word = generated[i];
        const separator = ['.', ',', '!', '?', ';', ':', '—', '-'].includes(word) ? '' : ' ';
        newSpan.textContent += (newSpan.textContent.length > 0 ? separator : '') + word;
        genBox.scrollTop = genBox.scrollHeight;
        await skippableSleep(200);
    }
    cursorSpan.remove();
    enableNext();
}

// ── Keyboard shortcuts ─────────────────────────────────────
document.addEventListener('keydown', e => {
    if (landing.classList.contains('hidden') === false) return;
    if (e.key === 'ArrowRight' && !nextBtn.disabled) nextBtn.click();
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) prevBtn.click();
    if (e.key === 's' || e.key === 'S') skipBtn.click();
    if (e.key === 'i' || e.key === 'I') infoBtn.click();
});
