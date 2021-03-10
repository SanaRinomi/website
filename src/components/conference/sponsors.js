import React, {Component} from "react"
import styled from "styled-components"
import LoadingIcon from "../../img/icons/loop_white.svg"
let data = require("./sponsors.json") // Information has been updated with current event sponsors.

let teams = new Map()

data = data.sort((a, b) => {
  let la = a.level.toLowerCase(),
    lb = b.level.toLowerCase()

  if (la < lb) {
    return -1
  }
  if (la > lb) {
    return 1
  }
  return 0
});

data.map(v => {
  let team = teams.get(v.level);
  if(team) {
    team.push(v);
    teams.set(v.level, team)
  } else teams.set(v.level, [v])
});

teams = [...teams.entries()].sort((a, b) => {
  const ap = a[1][0].priority,
    bp = b[1][0].priority;

  if (ap < bp) {
    return -1
  }
  if (ap > bp) {
    return 1
  }
  return 0
});
  

const SponsorGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin: 32px;
  gap: 16px;
  padding: inherit 20vw;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: inherit;
    margin: 0;
    padding: 0;
  }
`

const SponsorWrapper = styled.article`
  margin: 5vh 15vw;

  .white-bkg {
    background-color: whitesmoke;
  }

  a {
    display: block;
    padding: 1vh 0;
  }

  picture {
    max-width: 20vw;
  }

  .level-in-kind img{
    max-width: 10vw;
  }

  @media screen and (max-width: 600px) {
    margin: 5vh 5vw;
    padding: 0;

    picture {
      max-width: 90vw !important;
    }

    .level-in-kind {
      margin: 0 10vw;
    }

    .level-in-kind img {
      max-width: 70vw !important;
    }
  }
`

class Sponsor extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  async componentDidMount() {
    try {
      const img = await import(`../../img/sponsors/${this.props.item.logo}`);
      this.setState({image: img.default || img})
    }
    catch (e) {
      console.error(e)
    }
  }

  render() {
    const item = this.props.item;

    return (
      <SponsorWrapper>
        <a href={item.url} target="_blank" rel="noreferrer" className={item.background ? `white-bkg level-${item.level.toLowerCase()}` : "level-" + item.level.toLowerCase()}>
          <img src={this.state.image || LoadingIcon} alt={item.alt} key={item.logo} />
        </a>
      </SponsorWrapper>
    )
  }
}

/** const Sponsor = async ({ item }) => {
  const image = await import(item.logo)

  return (
    <SponsorWrapper>
      <a href={item.url} target="_blank" rel="noreferrer" className={item.background ? `white-bkg level-${item.level.toLowerCase()}` : "level-" + item.level.toLowerCase()}>
        <img src={data.file.childImageSharp.fluid} alt={item.alt} key={item.logo} />
      </a>
    </SponsorWrapper>
  )
} **/

export default () => (
  <>
    <br />
    {teams.map((sponsors) => (
      <>
        <h3>{sponsors[0]} Sponsors</h3>
        <SponsorGrid>
          {sponsors[1].map((sponsor) => (
            <Sponsor item={sponsor} key={sponsor.name} />
          ))}
        </SponsorGrid>
      </>
    ))}
  </>
)
