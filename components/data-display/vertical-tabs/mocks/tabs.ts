export const tabs = [
  {
    _key: 'picard',
    title: 'Jean-Luc Picard',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Jean-Luc Picard' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: 'Jean-Luc Picard is a fictional Starfleet officer in the Star Trek franchise, most notably the captain of the starship USS Enterprise-D. He appears in the television series Star Trek: The Next Generation and the feature films based on the series. Portrayed by Sir Patrick Stewart, Picard has a distinguished career as an archaeologist and diplomat. '
          },
          {
            _type: 'span',
            marks: ['strong'],
            text: "Picard's leadership style is characterized by his diplomatic approach and steady hand, often resolving conflicts with wisdom and negotiation rather than force."
          }
        ]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: ['italic'],
            text: 'For more about Jean-Luc Picard, visit his '
          },
          {
            _type: 'span',
            marks: ['link'],
            text: 'Wikipedia page',
            markDefs: [
              {
                _key: 'link',
                _type: 'link',
                href: 'https://en.wikipedia.org/wiki/Jean-Luc_Picard'
              }
            ]
          },
          {
            _type: 'span',
            marks: [],
            text: '.'
          }
        ]
      }
    ]
  },
  {
    _key: 'kirk',
    title: 'James T. Kirk',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'James T. Kirk' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "James Tiberius Kirk is the iconic captain of the starship USS Enterprise in the Star Trek universe. Portrayed by William Shatner, Kirk's audacious command style and daring adventures have made him a legendary figure in the Starfleet. "
          },
          {
            _type: 'span',
            marks: ['strong'],
            text: "Kirk's leadership is marked by his willingness to bend regulations and his strategies often involve significant risks."
          }
        ]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: ['italic'],
            text: 'Explore more about James T. Kirk on his '
          },
          {
            _type: 'span',
            marks: ['link'],
            text: 'Wikipedia page',
            markDefs: [
              {
                _key: 'link',
                _type: 'link',
                href: 'https://en.wikipedia.org/wiki/James_T._Kirk'
              }
            ]
          },
          {
            _type: 'span',
            marks: [],
            text: '.'
          }
        ]
      }
    ]
  },
  {
    _key: 'janeway',
    title: 'Kathryn Janeway',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Kathryn Janeway' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "Kathryn Janeway, portrayed by Kate Mulgrew, serves as the captain of the starship USS Voyager in the Star Trek series Voyager. Her character is noted for her profound leadership during Voyager's long journey back to Earth, navigating through unknown parts of the galaxy. "
          },
          {
            _type: 'span',
            marks: ['strong'],
            text: "Janeway's command decisions are often driven by her strong ethical compass and a deep sense of responsibility toward her crew."
          }
        ]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: ['italic'],
            text: 'Learn more about Kathryn Janeway through her '
          },
          {
            _type: 'span',
            marks: ['link'],
            text: 'Wikipedia page',
            markDefs: [
              {
                _key: 'link',
                _type: 'link',
                href: 'https://en.wikipedia.org/wiki/Kathryn_Janeway'
              }
            ]
          },
          {
            _type: 'span',
            marks: [],
            text: '.'
          }
        ]
      }
    ]
  },
  {
    _key: 'sisko',
    title: 'Benjamin Sisko',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Benjamin Sisko' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: 'Benjamin Sisko is a complex and intense commander of the Deep Space Nine space station in the Star Trek series Deep Space Nine. Portrayed by Avery Brooks, Sisko grapples with the challenges of war with the Borg and personal loss while commanding one of the most politically sensitive posts in Starfleet. '
          },
          {
            _type: 'span',
            marks: ['strong'],
            text: 'His leadership style evolves significantly over the series, becoming deeply intertwined with the religious and political shifts occurring in the region.'
          }
        ]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: ['italic'],
            text: 'Get more insights on Benjamin Sisko by visiting his '
          },
          {
            _type: 'span',
            marks: ['link'],
            text: 'Wikipedia page',
            markDefs: [
              {
                _key: 'link',
                _type: 'link',
                href: 'https://en.wikipedia.org/wiki/Benjamin_Sisko'
              }
            ]
          },
          {
            _type: 'span',
            marks: [],
            text: '.'
          }
        ]
      }
    ]
  }
];
