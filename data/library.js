// Dad Camp activity library. The generator picks from here; the web app shows the
// details when you tap a block. Add your own anytime — keep the same shape.
// youtube fields are SEARCH links (always resolve to current, relevant videos).
window.DADCAMP_LIBRARY = [

  // ───────────────────────── LEARNING BLOCK (10:15–11:00) ─────────────────────────
  {
    id: "learn-workbooks", slot: "learning", title: "Workbook Time",
    location: "indoor", duration: "20 min", energy: "low", focus: "workbook",
    everyDay: true,
    materials: { have: ["The girls' activity workbooks", "Pencils + eraser", "Crayons/markers"], buy: [] },
    steps: [
      "Each girl does 2–3 pages from her workbook (let them pick the pages).",
      "Sit with them for the tricky bits; keep it short and positive — stop while it's still fun.",
      "A sticker or a star when they finish today's pages."
    ],
    rainBackup: null, tags: ["workbook", "learning", "calm", "daily"]
  },
  {
    id: "learn-readaloud", slot: "learning", title: "Read-Aloud + Story Talk",
    location: "indoor", duration: "45 min", energy: "low", focus: "reading",
    materials: { have: ["A library/picture chapter book"], buy: [] },
    steps: [
      "Pick a book together; read aloud ~15–20 min (let each girl read a page if they want).",
      "Pause to predict: 'What do you think happens next?'",
      "After: each girl draws her favorite moment and tells you one sentence about it."
    ],
    rainBackup: null, tags: ["reading", "calm"]
  },
  {
    id: "learn-mathwar", slot: "learning", title: "Math War (card game)",
    location: "indoor", duration: "30–40 min", energy: "medium", focus: "math",
    materials: { have: ["A deck of cards"], buy: [] },
    steps: [
      "Split the deck. Each flips a card; first to say the SUM of both cards wins the pile (addition).",
      "Level up: flip three cards, or multiply for a challenge.",
      "Whoever has the most cards at the end wins."
    ],
    rainBackup: null, tags: ["math", "game"]
  },
  {
    id: "learn-storewithcoins", slot: "learning", title: "Play Store (money math)",
    location: "indoor", duration: "45 min", energy: "medium", focus: "math",
    materials: { have: ["Coins/play money", "Toys or snacks as 'stock'", "Sticky-note price tags"], buy: [] },
    steps: [
      "Set up a little shop; price items with sticky notes.",
      "Take turns being shopkeeper and customer — practice adding prices and making change.",
      "Bonus: give a budget ('you have 10') and they choose what fits."
    ],
    rainBackup: null, tags: ["math", "pretend"]
  },
  {
    id: "learn-hebrew-copywork", slot: "learning", title: "Hebrew Copywork + Word Hunt",
    location: "indoor", duration: "30–40 min", energy: "low", focus: "Hebrew",
    materials: { have: ["A Hebrew book", "Notebook", "Colored pencils"], buy: [] },
    steps: [
      "Find 5 fun Hebrew words in a book; copy them neatly into the notebook.",
      "Draw a tiny picture next to each word.",
      "Read them back to Dad as a 'word parade'."
    ],
    rainBackup: null, tags: ["Hebrew", "writing"]
  },
  {
    id: "learn-journal-comic", slot: "learning", title: "Comic-Strip Journal",
    location: "indoor", duration: "45 min", energy: "low", focus: "writing",
    materials: { have: ["Paper", "Pencils/markers"], buy: [] },
    steps: [
      "Fold paper into 4 boxes.",
      "Draw + write a 4-panel comic about something real or made-up (a pet, a superhero version of themselves).",
      "Add one sentence under each panel. Share aloud."
    ],
    rainBackup: null, tags: ["writing", "drawing"]
  },
  {
    id: "learn-science-volcano", slot: "learning", title: "Baking-Soda Volcano",
    location: "indoor", duration: "45 min", energy: "medium", focus: "science",
    materials: { have: ["Baking soda", "Vinegar", "Dish soap", "Tray", "Cup"], buy: ["Food coloring (optional)"] },
    steps: [
      "Put cup on a tray. Add 2 spoons baking soda, a squirt of soap, a few drops food coloring.",
      "Pour in vinegar and watch it erupt.",
      "Ask: what made the bubbles? (gas!) Try more/less vinegar to compare."
    ],
    youtube: "https://www.youtube.com/results?search_query=baking+soda+volcano+experiment+for+kids",
    rainBackup: null, tags: ["science", "messy"]
  },
  {
    id: "learn-science-walkingwater", slot: "learning", title: "Walking Water Rainbow",
    location: "indoor", duration: "30 min + watch", energy: "low", focus: "science",
    materials: { have: ["6 clear cups", "Paper towels", "Water", "Food coloring"], buy: [] },
    steps: [
      "Line up 6 cups; fill 1st, 3rd, 5th with water + a different color each.",
      "Fold paper towels into strips; bridge each cup to the next.",
      "Watch over the hour as colors 'walk' and mix into rainbows."
    ],
    youtube: "https://www.youtube.com/results?search_query=walking+water+rainbow+experiment",
    rainBackup: null, tags: ["science", "calm"]
  },
  {
    id: "learn-nature-science", slot: "learning", title: "Backyard Nature Science Hunt",
    location: "outdoor", duration: "45 min", energy: "medium", focus: "science",
    materials: { have: ["Magnifying glass (or phone zoom)", "Notebook"], buy: [] },
    steps: [
      "Hunt for 5 living things outside; sketch each.",
      "Sort them: plant or animal? How does it move/grow?",
      "Pick a favorite and write one 'I wonder…' question."
    ],
    rainBackup: "Do it at the window or with house plants + a nature book.", tags: ["science", "outdoor"]
  },

  // ───────────────────────── MAIN ACTIVITY (11:00–12:30) — crafts heavy ─────────────────────────
  {
    id: "main-saltdough", slot: "main", title: "Salt-Dough Charms & Beads",
    location: "indoor", duration: "60–90 min", energy: "medium",
    materials: { have: ["1 cup flour", "½ cup salt", "½ cup water", "Baking tray", "Paint"], buy: [] },
    steps: [
      "Mix flour + salt + water into a dough; knead until smooth.",
      "Shape charms, beads, or little animals (poke a hole if you want to string them).",
      "Bake at 100°C / 200°F for ~2–3 hrs until hard (or air-dry overnight).",
      "Paint once cool; thread beads onto string."
    ],
    youtube: "https://www.youtube.com/results?search_query=salt+dough+ornaments+kids+recipe",
    rainBackup: null, tags: ["craft", "paint"]
  },
  {
    id: "main-friendshipbracelets", slot: "main", title: "Friendship Bracelets",
    location: "indoor", duration: "60 min", energy: "low",
    materials: { have: ["Tape"], buy: ["Embroidery floss or yarn", "Pony beads (optional)"] },
    steps: [
      "Cut 3–4 strands; knot at top and tape to the table.",
      "Braid, or do simple repeating knots; add beads as you go.",
      "Tie off and trade bracelets with each other."
    ],
    youtube: "https://www.youtube.com/results?search_query=easy+friendship+bracelet+for+beginners+kids",
    rainBackup: null, tags: ["craft"]
  },
  {
    id: "main-slime", slot: "main", title: "DIY Slime",
    location: "indoor", duration: "45–60 min", energy: "medium",
    materials: { have: ["Bowl", "Spoon"], buy: ["White school glue", "Baking soda", "Contact-lens solution", "Glitter/food coloring"] },
    steps: [
      "Pour ~½ cup glue in a bowl; mix in color/glitter.",
      "Stir in ½ tsp baking soda.",
      "Add contact solution a little at a time, stirring, until it pulls from the bowl.",
      "Knead with hands until stretchy (add a drop more solution if too sticky)."
    ],
    youtube: "https://www.youtube.com/results?search_query=how+to+make+slime+with+contact+solution+kids",
    rainBackup: null, tags: ["craft", "messy", "sensory"]
  },
  {
    id: "main-rockpainting", slot: "main", title: "Painted Story Rocks",
    location: "indoor", duration: "60 min", energy: "low",
    materials: { have: ["Smooth rocks (collect on the morning walk!)", "Acrylic/poster paint", "Brushes"], buy: ["Paint pens (optional)"] },
    steps: [
      "Wash + dry rocks.",
      "Paint bugs, faces, animals, or letters.",
      "Once dry, use them as story prompts or hide them around the yard for each other."
    ],
    youtube: "https://www.youtube.com/results?search_query=rock+painting+ideas+for+kids+easy",
    rainBackup: null, tags: ["craft", "paint"]
  },
  {
    id: "main-suncatchers", slot: "main", title: "Window Sun-Catchers",
    location: "indoor", duration: "45–60 min", energy: "low",
    materials: { have: ["Clear contact paper or a zip bag", "Tissue paper scraps", "Scissors"], buy: ["Black card / construction paper"] },
    steps: [
      "Cut a shape frame from black paper (heart, butterfly, sun).",
      "Stick torn bits of colored tissue onto contact paper; press a second sheet on top.",
      "Trim and tape to a sunny window; watch the light glow through."
    ],
    youtube: "https://www.youtube.com/results?search_query=tissue+paper+suncatcher+craft+kids",
    rainBackup: null, tags: ["craft"]
  },
  {
    id: "main-cardboardbuild", slot: "main", title: "Cardboard Box Build (dollhouse / castle / car)",
    location: "indoor", duration: "90 min", energy: "high",
    materials: { have: ["Cardboard boxes", "Scissors", "Tape", "Markers", "Paint"], buy: [] },
    steps: [
      "Decide together what to build (a house, rocket, ice-cream stand).",
      "Cut doors/windows (Dad does sharp cuts); tape pieces together.",
      "Decorate with paint/markers and play with it after."
    ],
    youtube: "https://www.youtube.com/results?search_query=cardboard+box+craft+ideas+for+kids",
    rainBackup: null, tags: ["craft", "build"]
  },
  {
    id: "main-marblerun", slot: "main", title: "Cardboard Marble Run",
    location: "indoor", duration: "60–90 min", energy: "high",
    materials: { have: ["Cardboard tubes / cut boxes", "Tape", "A marble or small ball"], buy: [] },
    steps: [
      "Tape tubes and ramps down a wall or large box at angles.",
      "Test with the marble; adjust slopes so it flows top to bottom.",
      "Add a cup at the bottom as the 'goal'. Time the runs."
    ],
    youtube: "https://www.youtube.com/results?search_query=diy+cardboard+marble+run+kids",
    rainBackup: null, tags: ["build", "STEM"]
  },
  {
    id: "main-paperplanes", slot: "main", title: "Paper Airplane Lab",
    location: "indoor", duration: "45–60 min", energy: "medium",
    materials: { have: ["Paper", "Tape", "Markers"], buy: [] },
    steps: [
      "Fold 2–3 different plane designs each.",
      "Decorate them; mark a launch line and a target.",
      "Test which flies farthest/straightest and talk about why."
    ],
    youtube: "https://www.youtube.com/results?search_query=best+paper+airplane+designs+for+kids",
    rainBackup: null, tags: ["build", "STEM"]
  },
  {
    id: "main-tiedye", slot: "main", title: "Tie-Dye T-Shirts",
    location: "outdoor", duration: "60–90 min", energy: "medium",
    materials: { have: ["Old white shirts/socks", "Rubber bands", "Gloves", "Bucket"], buy: ["Tie-dye kit or fabric dye"] },
    steps: [
      "Twist/scrunch the shirt and bind with rubber bands.",
      "Apply dye to sections (do it outside or on a covered table).",
      "Bag for a few hours, rinse, and let dry. Big reveal!"
    ],
    youtube: "https://www.youtube.com/results?search_query=tie+dye+shirt+kids+tutorial",
    rainBackup: "Do it indoors on a covered table with a tray under the shirt.", tags: ["craft", "messy"]
  },
  {
    id: "main-pottery-paint", slot: "main", title: "Paint-Your-Own Pottery (at home)",
    location: "indoor", duration: "60–90 min", energy: "low",
    materials: { have: ["Plain ceramic mug/plate or plaster figures", "Acrylic paint", "Brushes"], buy: ["Plaster/ceramic blanks (optional)"] },
    steps: [
      "Plan a design (each does their own piece).",
      "Paint base coat, let dry, add details.",
      "Seal with a coat of mod-podge/varnish if you have it. Use it at dinner!"
    ],
    youtube: "https://www.youtube.com/results?search_query=paint+your+own+pottery+at+home+kids",
    rainBackup: null, tags: ["craft", "paint", "pottery"]
  },
  {
    id: "main-handprintart", slot: "main", title: "Handprint Animal Art",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Paint", "Paper", "Markers"], buy: [] },
    steps: [
      "Paint a palm/fingers and press onto paper.",
      "Turn prints into animals — a handprint becomes a peacock, fish, or tree.",
      "Add eyes and details with markers; make a little gallery."
    ],
    youtube: "https://www.youtube.com/results?search_query=handprint+animal+art+for+kids",
    rainBackup: null, tags: ["craft", "paint"]
  },
  {
    id: "main-origami", slot: "main", title: "Origami Animals",
    location: "indoor", duration: "45–60 min", energy: "low",
    materials: { have: ["Square paper", "Markers"], buy: ["Origami paper (optional)"] },
    steps: [
      "Start easy: a dog, fox, or jumping frog.",
      "Follow along step by step; draw faces on after.",
      "Make a small zoo and line them up."
    ],
    youtube: "https://www.youtube.com/results?search_query=easy+origami+for+kids+step+by+step",
    rainBackup: null, tags: ["craft"]
  },
  {
    id: "main-bakecookies", slot: "main", title: "Bake & Decorate Cookies",
    location: "indoor", duration: "90 min", energy: "medium",
    materials: { have: ["Flour, butter, sugar, egg", "Cookie cutters", "Sprinkles"], buy: ["Icing sugar / decorating icing"] },
    steps: [
      "Make a simple sugar-cookie dough together (great math: measuring!).",
      "Roll, cut shapes, bake.",
      "Once cool, decorate with icing and sprinkles."
    ],
    youtube: "https://www.youtube.com/results?search_query=easy+sugar+cookies+to+decorate+with+kids",
    rainBackup: null, tags: ["cooking", "math"]
  },
  {
    id: "main-minipizzas", slot: "main", title: "Make-Your-Own Mini Pizzas",
    location: "indoor", duration: "60 min", energy: "medium",
    materials: { have: ["Pita/English muffins/tortillas", "Tomato sauce", "Cheese", "Toppings"], buy: [] },
    steps: [
      "Set out toppings in bowls (a 'pizza bar').",
      "Each builds her own mini pizza — make a funny face with toppings.",
      "Bake until cheese melts; eat for lunch."
    ],
    rainBackup: null, tags: ["cooking"]
  },
  {
    id: "main-beadedjewelry", slot: "main", title: "Beaded Jewelry Studio",
    location: "indoor", duration: "60 min", energy: "low",
    materials: { have: ["String/elastic cord"], buy: ["Assorted beads", "Letter beads (optional)"] },
    steps: [
      "Plan a pattern (color repeat, or spell names with letter beads).",
      "String bracelets/necklaces; tie off.",
      "Make a set to keep and one to gift."
    ],
    youtube: "https://www.youtube.com/results?search_query=beaded+bracelet+making+for+kids",
    rainBackup: null, tags: ["craft"]
  },
  {
    id: "main-paperbagpuppets", slot: "main", title: "Puppet Show (make + perform)",
    location: "indoor", duration: "90 min", energy: "medium",
    materials: { have: ["Paper bags or socks", "Markers", "Glue", "Scraps of paper/yarn"], buy: ["Googly eyes (optional)"] },
    steps: [
      "Make 2–3 puppets each (characters for a story).",
      "Invent a short story together.",
      "Perform the puppet show for Dad from behind the couch."
    ],
    youtube: "https://www.youtube.com/results?search_query=paper+bag+puppet+craft+kids",
    rainBackup: null, tags: ["craft", "pretend"]
  },

  // ───────────────────────── QUIET TIME (13:15–14:00) ─────────────────────────
  {
    id: "quiet-audiobook", slot: "quiet", title: "Audiobook + Draw",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Audiobook/podcast for kids", "Paper", "Pencils"], buy: [] },
    steps: [
      "Put on a kids' audiobook or story podcast.",
      "Girls draw quietly while listening (draw what they hear).",
      "Lights low, comfy spot — true rest time."
    ],
    rainBackup: null, tags: ["calm", "screen-free", "drawing"]
  },
  {
    id: "quiet-puzzle", slot: "quiet", title: "Jigsaw Puzzle",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Age-appropriate jigsaw puzzle"], buy: [] },
    steps: ["Work a puzzle together or race two small ones.", "Frame edges first, then fill.", "Leave a big one out to return to across the week."],
    rainBackup: null, tags: ["calm", "screen-free"]
  },
  {
    id: "quiet-soloreading", slot: "quiet", title: "Cozy Solo Reading",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Library books", "Blanket/pillow fort"], buy: [] },
    steps: ["Build a quick cozy nook.", "Each reads her own books quietly.", "Optional: a sticker for every book finished this week."],
    rainBackup: null, tags: ["calm", "reading", "screen-free"]
  },
  {
    id: "quiet-boardgame-quiet", slot: "quiet", title: "Quiet Board Game (Sorry / Memory)",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Sorry, Memory, or a card game"], buy: [] },
    steps: ["Pick a calm game.", "Play one or two rounds.", "Practice taking turns and being a good sport."],
    rainBackup: null, tags: ["calm", "game", "screen-free"]
  },
  {
    id: "quiet-stickerbook", slot: "quiet", title: "Sticker / Activity Books",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Sticker books, dot-to-dot, mazes, coloring books"], buy: [] },
    steps: ["Hand out activity books.", "Quiet independent time at the table.", "Display finished pages on the fridge."],
    rainBackup: null, tags: ["calm", "screen-free"]
  },
  {
    id: "quiet-sensorybin", slot: "quiet", title: "Calm Sensory Bin",
    location: "indoor", duration: "45 min", energy: "low",
    materials: { have: ["Big container", "Rice or dry beans", "Cups, spoons, small toys"], buy: [] },
    steps: ["Fill a bin with rice; hide small toys.", "Scoop, pour, find the hidden treasures.", "Easy cleanup over a sheet/towel."],
    rainBackup: null, tags: ["calm", "sensory", "screen-free"]
  },

  // ───────────────────────── AFTERNOON ACTIVITY (14:00–16:00) — outings/projects ─────────────────────────
  {
    id: "aft-library", slot: "afternoon", title: "Library Trip (refresh books)",
    location: "outdoor", duration: "1.5–2 hrs", energy: "medium",
    materials: { have: ["Library cards", "Return any due books"], buy: [] },
    steps: ["Return last batch; each picks ~5 new books.", "Stay for any reading nook / story corner.", "Pick one book to read together that night."],
    rainBackup: null, tags: ["library", "books", "outing"], cadence: "every ~2 weeks"
  },
  {
    id: "aft-urbanair", slot: "afternoon", title: "Urban Air (season pass)",
    location: "indoor", duration: "2 hrs", energy: "high",
    materials: { have: ["Pass", "Grip socks", "Water bottles"], buy: [] },
    steps: ["Drive over; let them run the trampolines/obstacles.", "Set a 'meet Dad' time.", "Hydrate; calm wind-down on the way home."],
    rainBackup: null, tags: ["active", "outing"], cadence: "once per 1–2 weeks max"
  },
  {
    id: "aft-pottery-studio", slot: "afternoon", title: "Pottery-Painting Studio Outing",
    location: "indoor", duration: "2 hrs", energy: "low",
    materials: { have: ["Wallet (studio fees)"], buy: [] },
    steps: ["Go to a paint-your-own pottery place.", "Each picks a piece and paints it.", "They fire it; pick up later — a keepsake."],
    rainBackup: null, tags: ["craft", "pottery", "outing"]
  },
  {
    id: "aft-playdate", slot: "afternoon", title: "Playdate",
    location: "flexible", duration: "2 hrs", energy: "high",
    materials: { have: ["Coordinate with the other parent"], buy: [] },
    steps: ["Host or visit a friend.", "Offer a light activity (craft/snack/yard play) to anchor it.", "Confirm pickup/dropoff time."],
    rainBackup: "Move indoors — board games, craft, movie if hosting.", tags: ["social"]
  },
  {
    id: "aft-bigbake", slot: "afternoon", title: "Big Baking Project",
    location: "indoor", duration: "2 hrs", energy: "medium",
    materials: { have: ["Recipe ingredients", "Apron", "Mixing bowls"], buy: ["Special ingredient for the recipe"] },
    steps: ["Pick a recipe (cupcakes, challah, banana bread).", "Cook together — measuring, mixing, decorating.", "Share/deliver some to a neighbor."],
    rainBackup: null, tags: ["cooking", "math"]
  },
  {
    id: "aft-museum", slot: "afternoon", title: "Children's Museum / Science Center",
    location: "indoor", duration: "2 hrs", energy: "medium",
    materials: { have: ["Memberships/tickets", "Snacks"], buy: [] },
    steps: ["Drive to a kid museum or science center.", "Let them lead which exhibits to explore.", "Pick one 'favorite thing' each to tell Mom later."],
    rainBackup: null, tags: ["learning", "outing"]
  },
  {
    id: "aft-bigcraft", slot: "afternoon", title: "Big Craft Project (2-hr build)",
    location: "indoor", duration: "2 hrs", energy: "medium",
    materials: { have: ["See chosen craft", "Cardboard/paint/glue"], buy: [] },
    steps: ["Pick an ambitious craft (dollhouse, diorama, fairy garden).", "Work in stages with a snack break.", "Display the finished piece."],
    rainBackup: null, tags: ["craft"]
  },

  // ───────────────────────── OUTDOOR TIME (16:00–17:30) ─────────────────────────
  {
    id: "out-pool", slot: "outdoor", title: "Neighborhood Pool",
    location: "outdoor", duration: "1.5 hrs", energy: "high",
    materials: { have: ["Swimsuits", "Towels", "Sunscreen", "Goggles", "Water"], buy: [] },
    steps: ["3-min walk over; sunscreen first.", "Swim/play; practice a swim skill.", "Towel off and walk home."],
    rainBackup: "Indoor: bath-time 'pool' with cups & toys, or a water-themed craft.",
    weatherDependent: true, tags: ["water", "active"]
  },
  {
    id: "out-playground", slot: "outdoor", title: "Playground",
    location: "outdoor", duration: "1.5 hrs", energy: "high",
    materials: { have: ["Water bottles", "Hat"], buy: [] },
    steps: ["Walk/bike to a local playground.", "Free play + a quick game of tag or 'the floor is lava'.", "Cool-down walk home."],
    rainBackup: "Indoor obstacle course with cushions and tape lines.", tags: ["active"]
  },
  {
    id: "out-bikes", slot: "outdoor", title: "Bike / Scooter Ride",
    location: "outdoor", duration: "1.5 hrs", energy: "high",
    materials: { have: ["Bikes/scooters", "Helmets", "Water"], buy: [] },
    steps: ["Helmets on; pick a safe loop or path.", "Practice a skill (braking, a small hill).", "Make it a gentle 'adventure' with a turnaround landmark."],
    rainBackup: "Indoor: ride-on toys in the garage, or a dance party.", tags: ["active", "bikes"]
  },
  {
    id: "out-naturehunt", slot: "outdoor", title: "Nature Scavenger Hunt",
    location: "outdoor", duration: "1 hr", energy: "medium",
    materials: { have: ["A printed/drawn checklist", "A bag for treasures"], buy: [] },
    steps: ["Make a list (something red, a feather, a smooth rock, a Y-shaped stick).", "Hunt around the yard/park.", "Use finds for tomorrow's craft (e.g., rock painting)."],
    rainBackup: "Indoor scavenger hunt (find something soft, round, blue…).", tags: ["nature"]
  },
  {
    id: "out-chalk", slot: "outdoor", title: "Sidewalk Chalk + Games",
    location: "outdoor", duration: "1–1.5 hrs", energy: "medium",
    materials: { have: ["Sidewalk chalk"], buy: ["Sidewalk chalk (if out)"] },
    steps: ["Draw a hopscotch and a chalk obstacle course.", "Make a giant mural together.", "Play the games you drew."],
    rainBackup: "Indoor: painters-tape hopscotch on the floor.", tags: ["active", "art"]
  },
  {
    id: "out-waterplay", slot: "outdoor", title: "Backyard Water Play",
    location: "outdoor", duration: "1–1.5 hrs", energy: "high",
    materials: { have: ["Buckets, cups, sponges", "Water table or bins", "Towels"], buy: ["Water balloons (optional)"] },
    steps: ["Set up water stations (pouring, sponge toss, 'car wash' for toys).", "Sponge relay or gentle water-balloon catch.", "Dry off and hydrate."],
    rainBackup: "Move to the bathtub or a covered porch with bins.", weatherDependent: true, tags: ["water", "active"]
  },
  {
    id: "out-trampoline", slot: "outdoor", title: "Trampoline Games",
    location: "outdoor", duration: "45 min", energy: "high",
    materials: { have: ["Backyard trampoline"], buy: [] },
    steps: ["Warm up with gentle bounces.", "Play 'popcorn', 'Simon says', or bounce-and-count games.", "Short bursts — stop before they're worn out."],
    rainBackup: "Indoor: cushion crash-pad jumps (safely).", weatherDependent: true, tags: ["active"]
  },
  {
    id: "out-gardening", slot: "outdoor", title: "Plant & Garden",
    location: "outdoor", duration: "1 hr", energy: "medium",
    materials: { have: ["Soil", "Pots/containers", "Trowels"], buy: ["Seeds or seedlings (herbs/flowers)"] },
    steps: ["Fill pots with soil; plant seeds/seedlings.", "Water and pick a sunny spot.", "Start a little 'growth journal' to check each week."],
    rainBackup: "Indoor: plant herbs on the windowsill.", tags: ["nature", "science"]
  },
  {
    id: "out-ballgames", slot: "outdoor", title: "Ball Games / Mini Olympics",
    location: "outdoor", duration: "1 hr", energy: "high",
    materials: { have: ["Ball", "Cones or markers"], buy: [] },
    steps: ["Set up 3–4 stations (kicking, throwing at a target, races).", "Run a friendly 'mini Olympics' and award silly medals.", "Cool-down stretch."],
    rainBackup: "Indoor: balloon keepie-uppie and sock-ball basketball.", tags: ["active", "sports"]
  },
  {
    id: "out-bubbles", slot: "outdoor", title: "Giant Bubbles",
    location: "outdoor", duration: "45 min", energy: "medium",
    materials: { have: ["Dish soap", "Water", "String + 2 sticks"], buy: ["Bubble solution (optional)"] },
    steps: ["Mix dish soap + a little water (+ sugar/cornstarch for stronger bubbles).", "Make a giant bubble wand from string and sticks.", "Chase and pop; see who makes the biggest."],
    youtube: "https://www.youtube.com/results?search_query=homemade+giant+bubbles+recipe+for+kids",
    rainBackup: "Indoor: bubble snakes over the sink with a sock + bottle.", tags: ["active"]
  },

  // ───────────────────────── FREE CHOICE / FAMILY (17:30–18:30) ─────────────────────────
  {
    id: "free-boardgame", slot: "free", title: "Family Board Game",
    location: "indoor", duration: "1 hr", energy: "low",
    materials: { have: ["Sorry, Monopoly Jr., Uno, etc."], buy: [] },
    steps: ["Let the girls pick the game.", "Play together; coach good sportsmanship.", "Winner picks tomorrow's game."],
    rainBackup: null, tags: ["family", "game"]
  },
  {
    id: "free-movie", slot: "free", title: "Family Movie / Show (capped screen time)",
    location: "indoor", duration: "1 hr", energy: "low",
    materials: { have: ["A chosen movie/show", "Blankets", "Popcorn"], buy: [] },
    steps: ["This is the explicit, occasional screen slot — not a default.", "Pick together; make it cozy (popcorn, blankets).", "One episode or a movie start; talk about it after."],
    rainBackup: null, tags: ["family", "screen", "capped"]
  },
  {
    id: "free-danceparty", slot: "free", title: "Dance Party / Music",
    location: "indoor", duration: "45 min", energy: "high",
    materials: { have: ["Music"], buy: [] },
    steps: ["Each picks 2 songs.", "Freeze-dance and silly-moves rounds.", "Great energy-burner before dinner."],
    rainBackup: null, tags: ["family", "active"]
  },
  {
    id: "free-fort", slot: "free", title: "Build a Blanket Fort",
    location: "indoor", duration: "1 hr", energy: "medium",
    materials: { have: ["Blankets", "Chairs", "Cushions", "Clips/pegs"], buy: [] },
    steps: ["Drape blankets over chairs/couch; clip corners.", "Stock it with pillows and books.", "Read or have a snack inside it."],
    rainBackup: null, tags: ["family"]
  },
  {
    id: "free-cookdinner", slot: "free", title: "Kids Help Make Dinner",
    location: "indoor", duration: "1 hr", energy: "medium",
    materials: { have: ["Tonight's dinner ingredients"], buy: [] },
    steps: ["Give each a safe job (wash, stir, set table).", "Talk through the steps together.", "Proudly serve what they helped make."],
    rainBackup: null, tags: ["family", "cooking"]
  }
];
