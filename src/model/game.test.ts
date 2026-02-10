import { describe, expect, it } from "vitest"
import { Game } from "./game"

describe("game data structure", () => {
    const game = new Game()

    it("should create a circle 56 nodes long", () => {
    // forwards
        let currNode = game.head
        for (let i = 0; i < 56; i++) {
            currNode = currNode.forward[0]
        }

        expect(currNode).toEqual(game.head)

        // backwards
        currNode = game.head
        for (let i = 0; i < 56; i++) {
            currNode = currNode.backward[0]
        }

        expect(currNode).toEqual(game.head)
    })

    it("should create 4 homerows, each connected to the proper nodes", () => {
        let currNode = game.head.backward[0].backward[0]
        for (let i = 0; i < 4; i++) {
            const firstNode = currNode

            expect(currNode.forward.length).toEqual(2)

            // enter the home row
            currNode = currNode.forward[1]

            currNode = currNode.forward[0]
            currNode = currNode.forward[0]
            currNode = currNode.forward[0]

            expect(currNode.forward.length).toEqual(0)

            currNode = currNode.backward[0]
            currNode = currNode.backward[0]
            currNode = currNode.backward[0]
            currNode = currNode.backward[0]

            expect(currNode).toEqual(firstNode)

            // Move to the next players homerow
            for (let j = 0; j < 14; j++) {
                currNode = currNode.forward[0]
            }
        }
    })
})

describe("getValidMoves", () => {
    const game = new Game()
    it("should work on single-path returns", () => {
        const answer = game.getValidMoves({ position: game.players[0].startingPositions[0].forward[0], player: game.players[0] }, 3)

        expect(answer.length).toEqual(1)
        expect(answer).toEqual([{ newPos: game.head.forward[0].forward[0].forward[0] }])
    })

    it("should work on multi-path returns", () => {
        const answer = game.getValidMoves({ position: game.head.backward[0].backward[0].backward[0], player: game.players[0] }, 3)

        expect(answer.length).toEqual(2)
        expect(answer[0].newPos).toEqual(game.head)
        expect(answer[1].newPos).toEqual(game.head.backward[0].backward[0].forward[1].forward[0])
    })

    it("should return two paths if a player rolls a 4 from the start (aka, the player can't '4' into their own home row)", () => {
        const answer = game.getValidMoves({ position: game.players[0].startingPositions[0].forward[0], player: game.players[0] }, 4)

        expect(answer.length).toEqual(2)

        // forward 4
        expect(answer[0].newPos).toEqual(game.players[0].startingPositions[0].forward[0].forward[0].forward[0].forward[0].forward[0])

        // backward 4
        expect(answer[0].newPos).toEqual(game.players[0].startingPositions[0].forward[0].backward[0].backward[0].backward[0].backward[0])
    })
})
