import imgAllure from '../images/allure_sport.png';
import imgArmani from '../images/armani_code.png';
import imgAzzaro from '../images/azzaro_wanted.png';
import imgBlackXs from '../images/black_xs.png';
import imgFahrenheit from '../images/dior_fahrenheit.png';
import imgGucci from '../images/gucci_flora.png';
import imgInvictus from '../images/invictus_ap.png';
import imgKayali from '../images/kayali_28.jpg';
import imgVersace from '../images/versace_crystal_noir.png';
import imgKhamrah from '../images/khamrah.png';
import imgLaBelle from '../images/labelle.png';
import imgLacosteEssential from '../images/lacoste_essential.png';
import imgLacosteBlanc from '../images/lacoste_blanc.png';
import imgLhommeYsl from '../images/lhomme_ysl.png';
import imgLegend from '../images/montblanc_legend.png';
import imgLimperatrice from '../images/limperatrice.png';
import imgLacosteNoir from '../images/lacoste_noir.png';
import imgOudMood from '../images/oud_mood.jpg';
import imgAkroudGold from '../images/akroud_gold_bottle.png';
import imgBleuDeChanel from '../images/bleu_de_chanel_ap.jpg';
import imgSauvage from '../images/sauvage_dior_ap.jpg';
import imgScandalHomme from '../images/scandal_homme.png';
import imgStrongerWithYou from '../images/stronger_with_you_ap.jpg';
import imgTerreDhermes from '../images/terre_dhermes.png';
import imgUltraMale from '../images/ultra_male_ap.jpg';
import imgVersaceEros from '../images/versace_eros.png';

export const resolvePerfumeImage = (title, imageCover) => {
    const t = (title || "").toLowerCase();

    if (imageCover && typeof imageCover === 'string' && (imageCover.startsWith('data:') || imageCover.startsWith('http'))) {
        return imageCover;
    }

    if (t.includes("bleu") || t.includes("blue") || t.includes("chanel")) return imgBleuDeChanel;
    if (t.includes("eros") || t.includes("versace eros")) return imgVersaceEros;
    if (t.includes("ultra male") || t.includes("ultra mal")) return imgUltraMale;
    if (t.includes("terre") || t.includes("hermès") || t.includes("hermes")) return imgTerreDhermes;
    if (t.includes("stronger") || t.includes("strong")) return imgStrongerWithYou;
    if (t.includes("scandal")) return imgScandalHomme;
    if (t.includes("sauvage")) return imgSauvage;
    if (t.includes("lacoste noir") || (t.includes("lacoste") && t.includes("noir"))) return imgLacosteNoir;
    if (t.includes("essential") || t.includes("lacoste essential")) return imgLacosteEssential;
    if (t.includes("lacoste blanc") || t.includes("blanc")) return imgLacosteBlanc;
    if (t.includes("oud mood") || t.includes("عود مود")) return imgOudMood;
    if (t.includes("impératrice") || t.includes("imperatrice")) return imgLimperatrice;
    if (t.includes("l'homme") || t.includes("yves saint laurent")) return imgLhommeYsl;
    if (t.includes("legend") || t.includes("montblanc")) return imgLegend;
    if (t.includes("خمرة") || t.includes("khamrah")) return imgKhamrah;
    if (t.includes("labelle") || t.includes("la belle")) return imgLaBelle;
    if (t.includes("allure")) return imgAllure;
    if (t.includes("armani") || t.includes("code")) return imgArmani;
    if (t.includes("azzaro") || t.includes("wanted")) return imgAzzaro;
    if (t.includes("black xs") || t.includes("black")) return imgBlackXs;
    if (t.includes("fahrenheit")) return imgFahrenheit;
    if (t.includes("gucci") || t.includes("flora")) return imgGucci;
    if (t.includes("invictus")) return imgInvictus;
    if (t.includes("kayali")) return imgKayali;
    if (t.includes("versace") || t.includes("crystal")) return imgVersace;

    return imgAkroudGold;
};

export const defaultPerfumesList = [
    // --- BEST SELLERS AT TOP ---
    { _id: "p1", title: "Sauvage Dior", category: { name: "Homme" }, brand: { name: "Dior" }, price: 50, ratingsAverage: 4.9, description: "Un acte de création inspiré des grands espaces sauvages. Flacon Signature 30ml." },
    { _id: "p2", title: "Bleu de Chanel", category: { name: "Homme" }, brand: { name: "Chanel" }, price: 50, ratingsAverage: 4.9, description: "Éloge de la liberté masculine dans un flacon bleu nuit. Flacon Signature 30ml." },
    { _id: "p3", title: "Ultra Male", category: { name: "Homme" }, brand: { name: "Jean Paul Gaultier" }, price: 50, ratingsAverage: 4.8, description: "Intense, irrésistible et gourmand avec une poire juteuse. Flacon 30ml." },
    { _id: "p4", title: "Stronger With You", category: { name: "Homme" }, brand: { name: "Giorgio Armani" }, price: 50, ratingsAverage: 4.8, description: "Un parfum chaud et envoûtant aux accords de châtaigne. Flacon 30ml." },

    // --- HOMME ---
    { _id: "p5", title: "Diesel (Disel)", category: { name: "Homme" }, brand: { name: "Paco Rabanne" }, price: 50, ratingsAverage: 4.7, description: "Parfum masculin intense et audacieux Akroud Parfum 30ml." },
    { _id: "p6", title: "Le Male", category: { name: "Homme" }, brand: { name: "Jean Paul Gaultier" }, price: 50, ratingsAverage: 4.7, description: "Fragrance incontournable et virile aux notes de menthe et lavande 30ml." },
    { _id: "p7", title: "Allure Sport", category: { name: "Homme" }, brand: { name: "Chanel" }, price: 50, ratingsAverage: 4.8, description: "Une fraîcheur vivifiante et boisée signée Chanel 30ml." },
    { _id: "p8", title: "Lacoste Noir", category: { name: "Homme" }, brand: { name: "Lacoste" }, price: 50, ratingsAverage: 4.6, description: "Intensité aromatique boisée et poivrée 30ml." },
    { _id: "p9", title: "Lacoste Essential", category: { name: "Homme" }, brand: { name: "Lacoste" }, price: 50, ratingsAverage: 4.6, description: "Un souffle de fraîcheur énergisant pour le quotidien 30ml." },
    { _id: "p10", title: "Lacoste Blanc", category: { name: "Homme" }, brand: { name: "Lacoste" }, price: 50, ratingsAverage: 4.7, description: "Élégance pure et sportive aux notes de tubéreuse et cèdre 30ml." },
    { _id: "p11", title: "Baccarat Rouge 540", category: { name: "Homme" }, brand: { name: "Maison Francis Kurkdjian" }, price: 50, ratingsAverage: 4.9, description: "L'alchimie poétique du jasmin et du safran aux notes ambrées 30ml." },
    { _id: "p12", title: "One Million", category: { name: "Homme" }, brand: { name: "Paco Rabanne" }, price: 50, ratingsAverage: 4.8, description: "Le parfum du succès, des notes de cuir et de mandarine 30ml." },
    { _id: "p13", title: "Soft", category: { name: "Homme" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.5, description: "Une douceur subtile et chaleureuse pour homme 30ml." },
    { _id: "p14", title: "Legend Montblanc", category: { name: "Homme" }, brand: { name: "Montblanc" }, price: 50, ratingsAverage: 4.7, description: "Un fougère moderne, masculin et charismatique 30ml." },
    { _id: "p15", title: "Azzaro Wanted", category: { name: "Homme" }, brand: { name: "Azzaro" }, price: 50, ratingsAverage: 4.7, description: "Une fragrance boisée et épicée pour l'homme hédoniste 30ml." },
    { _id: "p16", title: "212 VIP Homme", category: { name: "Homme" }, brand: { name: "Carolina Herrera" }, price: 50, ratingsAverage: 4.6, description: "Le parfum des soirées d'exception aux notes de gin et menthe 30ml." },
    { _id: "p17", title: "خمرة (Khamrah)", category: { name: "Orientaux" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.9, description: "Un parfum oriental somptueux aux notes de cannelle, datte et vanille 30ml." },
    { _id: "p18", title: "Invictus", category: { name: "Homme" }, brand: { name: "Paco Rabanne" }, price: 50, ratingsAverage: 4.8, description: "Le parfum de la victoire, fraîcheur marine et bois sensuel 30ml." },
    { _id: "p19", title: "Black XS Lexus", category: { name: "Homme" }, brand: { name: "Paco Rabanne" }, price: 50, ratingsAverage: 4.6, description: "Un rock sensuel aux notes de praline et citron 30ml." },
    { _id: "p20", title: "Valentino Uomo", category: { name: "Homme" }, brand: { name: "Valentino" }, price: 50, ratingsAverage: 4.7, description: "Élégance italienne moderne avec notes de bergamote et cuir 30ml." },
    { _id: "p21", title: "Scandal Homme", category: { name: "Homme" }, brand: { name: "Jean Paul Gaultier" }, price: 50, ratingsAverage: 4.8, description: "Une overdose de caramel et de sauge pour un sillage sensuel 30ml." },
    { _id: "p22", title: "L'Homme Yves Saint Laurent", category: { name: "Homme" }, brand: { name: "Yves Saint Laurent" }, price: 50, ratingsAverage: 4.7, description: "L'équilibre parfait entre l'élégance et la virilité 30ml." },
    { _id: "p23", title: "Versace Eros", category: { name: "Homme" }, brand: { name: "Versace" }, price: 50, ratingsAverage: 4.9, description: "L'incarnation de la passion et du désir masculin 30ml." },
    { _id: "p24", title: "Terre d'Hermès", category: { name: "Homme" }, brand: { name: "Hermès" }, price: 50, ratingsAverage: 4.8, description: "Une alchimie minérale et boisée entre ciel et terre 30ml." },
    { _id: "p25", title: "عود (Oud Royal)", category: { name: "Orientaux" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.9, description: "L'essence précieuse du bois d'oud aux notes riches et ambrées 30ml." },
    { _id: "p26", title: "Kenzo Homme", category: { name: "Homme" }, brand: { name: "Kenzo" }, price: 50, ratingsAverage: 4.6, description: "Une brise marine et boisée inspirée par l'océan 30ml." },
    { _id: "p27", title: "Y Yves Saint Laurent", category: { name: "Homme" }, brand: { name: "Yves Saint Laurent" }, price: 50, ratingsAverage: 4.8, description: "La fraîcheur audacieuse de la sauge et du géranium 30ml." },
    { _id: "p28", title: "عود مود (Oud Mood)", category: { name: "Orientaux" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.9, description: "Un parfum oriental chaleureux, ambré et boisé d'exception 30ml." },

    // --- FEMME ---
    { _id: "p29", title: "My Way", category: { name: "Femme" }, brand: { name: "Giorgio Armani" }, price: 50, ratingsAverage: 4.8, description: "Un bouquet de fleurs blanches lumineuses et élégantes 30ml." },
    { _id: "p30", title: "Candy Love", category: { name: "Femme" }, brand: { name: "Escada" }, price: 50, ratingsAverage: 4.6, description: "Une gourmandise fruitée aux notes de pomme d'amour et chantilly 30ml." },
    { _id: "p31", title: "Coco Chanel", category: { name: "Femme" }, brand: { name: "Chanel" }, price: 50, ratingsAverage: 4.9, description: "Le chef-d'œuvre de la parfumerie féminine française 30ml." },
    { _id: "p32", title: "Yara Lattafa", category: { name: "Femme" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.9, description: "Un parfum gourmand aux notes de fraise, vanille et orchidée 30ml." },
    { _id: "p33", title: "Burberry Her", category: { name: "Femme" }, brand: { name: "Burberry" }, price: 50, ratingsAverage: 4.7, description: "L'esprit vibrant de Londres aux notes de baies rouges 30ml." },
    { _id: "p34", title: "Libre YSL", category: { name: "Femme" }, brand: { name: "Yves Saint Laurent" }, price: 50, ratingsAverage: 4.9, description: "La lavande florale pour une femme audacieuse et libre 30ml." },
    { _id: "p35", title: "Victoria's Secret Bombshell", category: { name: "Femme" }, brand: { name: "Victoria's Secret" }, price: 50, ratingsAverage: 4.8, description: "Un cocktail fruité et floral irrésistible 30ml." },
    { _id: "p36", title: "Olympea", category: { name: "Femme" }, brand: { name: "Paco Rabanne" }, price: 50, ratingsAverage: 4.8, description: "La déesse moderne aux notes de vanille salée et jasmin 30ml." },
    { _id: "p37", title: "Si Armani", category: { name: "Femme" }, brand: { name: "Giorgio Armani" }, price: 50, ratingsAverage: 4.8, description: "La grâce, la force et l'esprit d'indépendance féminin 30ml." },
    { _id: "p38", title: "Escada Taj Sunset", category: { name: "Femme" }, brand: { name: "Escada" }, price: 50, ratingsAverage: 4.7, description: "Un coucher de soleil tropical aux arômes de mangue alphonso 30ml." },
    { _id: "p39", title: "أميرة العرب (Amirat Al Arab)", category: { name: "Orientaux" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.9, description: "Le parfum de la royauté arabe aux notes de fleurs et miel précieux 30ml." },
    { _id: "p40", title: "الغبار الذهبي (Dust Gold)", category: { name: "Orientaux" }, brand: { name: "Lattafa" }, price: 50, ratingsAverage: 4.8, description: "Une fragrance orientale luxueuse saupoudrée d'or 30ml." },
    { _id: "p41", title: "Paradoxe Prada", category: { name: "Femme" }, brand: { name: "Prada" }, price: 50, ratingsAverage: 4.9, description: "La réinvention de la sensualité avec fleur d'oranger et ambre 30ml." },
    { _id: "p42", title: "Good Girl", category: { name: "Femme" }, brand: { name: "Carolina Herrera" }, price: 50, ratingsAverage: 4.9, description: "La dualité féminine révélée par la tubéreuse et le cacao 30ml." },
    { _id: "p43", title: "Coconut Passion", category: { name: "Femme" }, brand: { name: "Victoria's Secret" }, price: 50, ratingsAverage: 4.7, description: "La chaleur de la noix de coco tropicale et de la vanille douce 30ml." },
    { _id: "p44", title: "La Vie Est Belle", category: { name: "Femme" }, brand: { name: "Lancôme" }, price: 50, ratingsAverage: 4.9, description: "Le bonheur capturé dans un flacon gourmand d'iris et praline 30ml." },
    { _id: "p45", title: "L'Interdit Givenchy", category: { name: "Femme" }, brand: { name: "Givenchy" }, price: 50, ratingsAverage: 4.8, description: "Le frisson de l'interdit avec la fleur d'oranger et le patchouli 30ml." },
    { _id: "p46", title: "Kayali Vanilla 28", category: { name: "Femme" }, brand: { name: "Kayali" }, price: 50, ratingsAverage: 4.9, description: "Une vanille de Madagascar riche, ambrée et captivante 30ml." }
].map(p => ({
    ...p,
    imageCover: resolvePerfumeImage(p.title)
}));
