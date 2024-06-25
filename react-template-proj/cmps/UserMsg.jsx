import { eventBusService } from '../services/event-bus.service.js'
const { useEffect, useState ,useRef} = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    const timeoutIdRef = useRef()

    useEffect(() => {

        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            timeoutIdRef.current = setTimeout(onCloseMsg, 3000);
        })

        return () => {
            unsubscribe()
        }

    }, [])

    function onCloseMsg() {
        clearTimeout(timeoutIdRef.current)
        setMsg(null)
    }

    if (!msg) return null
    return (
        <div className={'user-msg ' + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onCloseMsg}>x</button>
        </div>
    )
}