import "./../styles/statistic.css";

export default function Statistics() {
  return (
    <div className="con">
      <div className="statistic-con">
        <div className="title">Statistics</div>
        <div className="stat">
          <div className="stat1" id="statt1">
            <span className="stats">
              <span>
                <div className="num">89.3%</div>
                <div className="rate">Answer Rate</div>
              </span>
              <span className="pro">
                <img src="" alt="" />
                <p>0.5%</p>
              </span>
            </span>
            <span className="stats">
              <span>
                <div className="num">70.2%</div>
                <div className="rate">Deflection Rate</div>
              </span>
              <span className="pro">
                <img src="" alt="" />
                <p>0.5%</p>
              </span>
            </span>
            <span className="stats">
              <span>
                <div className="num">77.8%</div>
                <div className="rate">Resolution Rate</div>
              </span>
              <span className="pro">
                <img src="" alt="" />
                <p>0.5%</p>
              </span>
            </span>
          </div>
          <div className="stat1" id="statt2">
            <span className="stats">
              <span>
                <div className="num">6,266</div>
                <div className="rate">Conversations</div>
              </span>
              <span className="pro">
                <img src="" alt="" />
                <p>0.5%</p>
              </span>
            </span>
            <span className="stats">
              <span>
                <div className="num">98.77%</div>
                <div className="rate">Satisfaction</div>
              </span>
              <span className="pro">
                <img src="" alt="" />
                <p>0.5%</p>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="history-con">
        <div className="title">Histories</div>
        <div className="sear-ex">
          <div className="sear">
            {/* <img src="" alt="" /> */}
            <input type="text" placeholder="Search Chats" />
          </div>
          <div className="ex">
            <button>
              <img src="" alt="" />
              Export
            </button>
          </div>
        </div>
        <div className="category">
          <div className="left-cat">
            <div className="all-chat">All Chats</div>
            <div className="freq">50</div>
          </div>
          <div className="right-cat">
            <div className="cat">
              <select name="Topic" id="topic">
                <option value="" disabled selected>
                  Topic
                </option>
                <option value="Technical">Technical</option>
                <option value="Product">Product</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="cat">
              <select name="Language" id="language">
                <option value="" disabled selected>
                  Language
                </option>
                <option value="English">English</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Spanish">Spanish</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="cat">
              <p>Urgency</p>
              <img src="" alt="" />
            </div>
            <div className="cat">
              <p>Sentiment</p>
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <hr className="br" />
        <div className="content-his">
          <div className="left-his">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              rerum dolorem, aperiam molestias fuga corporis itaque, deleniti
              odit ratione numquam vero voluptatum recusandae quidem culpa nobis
              voluptas?
            </p>
          </div>
          <div className="right-his">
            <div className="his1">Lorem</div>
            <div className="his1">Lorem</div>
            <div className="his">
              <img src="" alt="" />
              <span>10%</span>
            </div>
            <div className="his">
              <img src="" alt="" />
              <span>Lorem</span>
            </div>
          </div>
        </div>
        <div className="page-bot">
          <div className="left-bot">1-5 of 10</div>
          <div className="right-bot">
            <p>The page you're on</p>
            <select name="page" id="page">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <button>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAASlJREFUaEPt2NENwjAMBNDrJrAJbAKbwCTAJDAKo0AQlRBqoRef61Qy32m4d45KaYeFf7qF50cCoieYE8gJGBvII2Qs0Hx5TuBHhSsAd3PFfzbwmsAGwBXA8fn9B0+EB6AP3+d2RagB3+F7xNrrOCkBY+G3AG5ex0gFCAlfSlEAwsIrAKHhrYDw8BZAE+FrAc2ErwE0FZ4FjIVX3+KpO+PUxXOFZ0ud/DuwA3BSVz2y39RSX5czi+dCMJkoQAEPIcoz/8X7sXls+pT2vUlTiBpAU5OoBTSDsACaQFgB4QgFIBShAoQhlIBfiPK/2OUdkRowhNgDOHs9hngAPhGu4dlnIbbERb9aZLHV672OUHUg9sIEsI2p1+cE1I2y++UE2MbU63MC6kbZ/R4QETsxltkWOQAAAABJRU5ErkJggg==" />
            </button>
            <button>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAASdJREFUaEPtmNENwjAMRK+bMApswiawCTAJbAKblPojUlVVilP7nFZyfknb9+4iOWLAwddwcH6kQO8Gs4FswJhAHiFjgObHswFlhFcAT+Xepm0RDTwAnAG8JrJ7E51iM1tA4CV9WT+GBFNAUn8vQnSXYAoIu6QvLcyXqwRbgC4RIUCViBKgSUQKUCSiBdwlegi4SvQScJPYIjAqJrxlS9Oc2KNA07VjrwIicZkugZ9alXsVUMGL3BaBWija39cue+rky0d6CbjA92rADb6HgCt8tIA7fKQABT5KgAYfIUCFZwucAHxXhoJ6SGkGCnsOyP9AtxmIKzy7gcJdJNzhowTkO3Kc5JrsvthHyB14+cIUoEdc+UA2kA0YE8gjZAzQ/Hg2YI7Q+II/cqJCMTNwKjkAAAAASUVORK5CYII=" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
