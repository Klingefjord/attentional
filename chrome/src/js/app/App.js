import React, { useState } from 'react'

import ClassifyContentView from "./components/ClassifyContentView";
import RemoveFeaturesView from "./components/RemoveFeaturesView";
import ShowHiddenContentView from "./components/ShowHiddenContentView";
import TimeOnSiteView from "./components/TimeOnSiteView";

const App = props => {

  const [activeTab, setActiveTab] = useState(0)

  const content = activeTab => {
    switch(activeTab) {
      case 0: return <ClassifyContentView />
      case 1: return <RemoveFeaturesView />
      case 2: return <ShowHiddenContentView />
      case 3: return <TimeOnSiteView />
      default: return <ClassifyContentView />
    }
  }

  return (
    <div>
      <h1>Attentional</h1>
      <button onClick={() => setActiveTab(0)}>Classify Content</button>
      <button onClick={() => setActiveTab(1)}>Remove Features</button>
      <button onClick={() => setActiveTab(2)}>Show Hidden Content</button>
      <button onClick={() => setActiveTab(3)}>Configure time allowed</button>
      {content(activeTab)}
    </div>
  )
}

export default App
