export interface IDuBoardList {
  id: number;
  subject: string;
  content: string;
  datetime: string;
  favor: number;
  comment: IDuComment[];
  author: string;
}
export interface IDuComment {
  id: number;
  content: {
    id: number;
    content: string;
  }[];
}

export const DuComment = [
  {
    id: 1,
    content: [
      {
        id: 1,
        content: '정말 좋은 이야기네요.',
      },
      {
        id: 2,
        content:
          '오늘도 좋은 하루 보내시길 오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길오늘도 좋은 하루 보내시길',
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        id: 1,
        content: '꽃이 정말 예뻐요',
      },
      {
        id: 2,
        content: '나랏말싸미',
      },
    ],
  },
];
export const DuBoardList = [
  {
    id: 1,
    subject: '오늘도 즐겁게',
    content: `Good morning everybody! 

    Here’s my summary of most important developments in Ukraine on 1 and 2 May 2022.
    
    STRATEGIC
    
    Much of the Western, but also the media elsewhere seems to still be babbling about ongoing negotiations between Russia and Ukraine, and expecting some sort of a peace deal. Indeed, it seems that some of Western politicians are getting tired of the war, and quite a few of politicians elsewhere are trying to push Kyiv into concessions — if for no other reason then to restore the interrupted supply of food from Ukraine.
    
    Well, sorry to disappoint, but: any peace deals would take at least two, and right now I do not see even one. Regardless who is said to be guaranteeing what, Putin’s not even seriously negotiating: this is unsurprising because it would be a ‘political suicide’ for him to accept anything less than ‘at least protection’ of Russia-controlled Donbass (which in turn would be a far cry from all of what he still demands). On the other side, to me it appears the mass of Ukrainians have concluded that a peace deal with Russia is impossible as long as any RFA troops are still in the country — and then no matter where. It’s not only obvious that not only Putin, but the mass of Russians despise Ukraine to the point where they openly support Putin’s war of extermination, but mass atrocities, terror, and looting of areas occupied by the RFA, deportation of more than 1 million of Ukrainians into Russia, and eviction of over 11 million from their homes in the East… well, after all of these horrors, I doubt the people of Ukraine would tolerate their government making any kind of concessions to Putin. In turn, this means that Zelensky cannot accept any kind of solutions short of a full Russian withdrawal, restoration of territorial integrity of Ukraine, and Russian guarantees for the country’s future (i.e. exactly the opposite to what Putin demands).
    
    Therefore, that with restoration of food-exports from Ukraine is going to take a while longer. Those still refusing to accept this fact, still ignoring the fact that Russia is maintaining blockade of Ukrainian ports in the Black Sea, and longing to ‘get back to business as usual’ might want to understand that even if the Russians would completely withdraw in the next five minutes, the carnage and destruction caused by this war are so massive, it would take years to clean the east of Ukraine from all the mines and unexploded ammunition, not to talk about reconstruct the infra-structure and enable ‘normal’ life.
    
    In total, I cannot but repeat myself: this war is going to be decided on the battlefield.
    
    BTW, since the campaign of ‘spontaneous fires’ in Russia is accelerating, and there are really lots of incidents all over the country, there’re now instances — like this one — trying to track all of these down.
    
    AIR
    
    Moscow seems to be both clueless and desperate about the fact that the RFA lacks the means at least to find, not to talk about precisely strike and thus interrupt the flow of Western arms into Ukraine. Instead, the RFA reverted to the most primitive means of searching for targets: ‘scouting by fire’. That is, the Russians are wasting their continuously decreasing stock of cruise missiles to target whatever storage facilities they think might be used to hide Western weapons.
    
    With other words: after hospitals and apartment buildings, the new priority for Russian targeting lists in Ukraine are hangars, garages, warehouses etc. A ‘good example’ of this occurred in the Dnipropetrovsk area, on 1 May: a cruise missile went off in between two warehouses of an agricultural enterprise in the Synelynkovsky District. One hangar was badly damaged (see attached photo), the other destroyed.
    
    
    For those still thinking the Keystone Cops are running their operations based on my summaries: yesterday, on 2 May, a P-800 Onyx cruise missile hit the Zatoka Bridge, south of Odessa. Amount of damage remains unknown. Mind: I didn’t mention that bridge with a single word for at least four days.
    
    Another Onyx hit an apartment building in Odessa yesterday, killing a 14-years old child and wounding several others.
    
    Talking about missile strikes: the People in Need of Fresh Air say, the Russians have fired 1,215 ballistic missiles at Ukraine so far. Much less clear is the number of cruise missiles released by now: figures are ranging from around 900 to over 1,900. Part of this depends on what weapons are counted as such: for example, some seem to include Kh-35 (ASCC/NATO-codename ‘AS-20 Kayak’), Kh-59 Ovod (‘AS-13 Kingbolt’), and Kh-59M Ovod-M (‘AS-18 Kazoo’) land-attack/anti-ship missiles, apparently because the latter have, depending on variant, a range of up to 200km.
    
    Of the Russian ‘flying stuff’, most active over the last two days were Russian Orlan reconnaissance UAVs — and then over all the frontlines in eastern and southern Ukraine. Unsurprisingly, the defenders claimed ten of these shot down on 1 May alone. Another eight were claimed as shot down on 2 May, including a Forpost that attempted to reach Odessa (Forpost is the Russian version of the Israeli-made Searcher).
    
    In turn, the Russians claimed an Ukrainian Mi-8 helicopter shot down by a MANPAD, but provided no details, and the Keystone Cops have published this video, purportedly shown destruction of the S-300 fire-control radar by an Iskander-K missile:
    
    
    NAVAL
    
    Following the Ukrainian strike at the Russian electronic warfare facilities on the Zmiyniy Island, on 30 April, the Russian Navy is down to keeping the island supplied with help of Raptor-class speedboats — and this effort is now interdicted by Ukrainian UAVs: on 1 May, they claimed the destruction of two such boats — both by Bayraktars.
    
    
    
    BATTLE OF DONBASS
    
    Following an Ukrainian artillery strike on a Russian command post near Izium, on 30 April, Kyiv claimed the death or injury of up to 20 high-ranking officers. Some sources claimed even Gerasimov was wounded. As usually, there’s no clear confirmation for any of related reports: but, there’s no denial that the activity of RFA in eastern Ukraine slowed down by quite some, at least for 36 hours after that attack, before it was ‘back to normal, yesterday, on 2 May.
    
    In general, it seems that during 1 May, the RFA began re-deploying whatever ‘reserves’ it was able to find along different sectors of the frontline, and concentrating these in relatively few ‘hotspots’. One is the well-known area south of Izium; the other Lyman, the third Rubizhne, the fourth Popasna, and the fifth was the area south of Kryviy Rihh. At least three of these areas have received contingents of 500 combatants from the Wagner PMC, each, too.
    
    Combat-wise, the RFA ‘only’ shelled Ukrainian frontlines south of Izium: the Ukrainian 25th Airborne (AFAIK, a new arrival in this area) hit back in fashion. That said, Russian reports are indicating plenty of small-scale engagements like this one, in which Ukrainian T-64 was knocked out by RFA’s tanks:
    
    
    
    
    `,
    datetime: '2022-05-05',
    favor: 30,
    comment: DuComment,
    author: 'Andrew Hwan',
  },
  {
    id: 2,
    subject: '오늘도 우울하게',
    content: '우울하게 하루를 시작해보자',
    datetime: '2022-05-04',
    favor: 30,
    comment: DuComment,
    author: '이순신',
  },
  {
    id: 3,
    subject: '오늘도 우울하게 재밌게',
    content: '우울하게 하루를 시작시작해보자',
    datetime: '2022-05-02',
    favor: 30,
    comment: DuComment,
    author: '세종대왕',
  },
  {
    id: 4,
    subject: '오늘도 재미지게하게',
    content: '우울하게 하루를 재미시작해보자',
    datetime: '2022-05-01',
    favor: 30,
    comment: DuComment,
    author: '최무선',
  },
];
