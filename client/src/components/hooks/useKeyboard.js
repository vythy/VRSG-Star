import { useMemo, useEffect } from "react"

const useKeyPress = () => {
    const keys = ['d','f','j','k']
    const kb = useMemo(() => ({}))
    const kbKeyDown = useMemo(() => ({}))

    let unPressTimeouts = {
        'd': setTimeout,
        'f': setTimeout,
        'j': setTimeout,
        'k': setTimeout
    }

    const downHandler = (e) => {
        if (keys.includes(e.key) && !kbKeyDown[e.key]) {
            kb[e.key] = true
            kbKeyDown[e.key] = true
            unPressTimeouts[e.key] = setTimeout(() => (kb[e.key] = false), 17)
        }
    }

    const upHandler = (e) => {
        if (!keys.includes(e.key)) return

        kb[e.key] = false
        kbKeyDown[e.key] = false
        clearTimeout(unPressTimeouts[e.key])
    }

    useEffect(() => {
        document.addEventListener("keydown", downHandler)
        document.addEventListener("keyup", upHandler)

        return () => {
            document.removeEventListener("keydown", downHandler)
            document.removeEventListener("keyup", upHandler)

            Object.values(unPressTimeouts).forEach(value => (clearTimeout(value)))
        }
    })

    return kb
}

export default useKeyPress