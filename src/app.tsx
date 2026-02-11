import { Route, Switch } from "wouter-preact"
import { GamePage } from "./pages/game/game.page"
import { JoinPage } from "./pages/join.page"
import ""

export function App() {
    return (
        <Switch>
            <Route path="/" component={JoinPage} />
            <Route path="/game" component={GamePage} />
            <Route>Oops!</Route>
        </Switch>
    )
}
