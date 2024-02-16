import useComponentVisible from "../common"

const Scope = ({ scope, handleScopeAddition, handleScopeRemoval, renameScope }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    return (
        <div className="scope" ref={ref} style={{ borderTop: scope.name ? '1px solid lightgray' : '' }}>
            <input className="scope_name" value={scope.name} onChange={(e) => renameScope(scope.id, e.target.value)} />
            <div className="scode_options_icon" onClick={() => { setIsComponentVisible(true) }}>
            </div>
            {isComponentVisible && <div className="scope_options">
                <div className="scope_option" onClick={() => {
                    setIsComponentVisible(false)
                    handleScopeAddition(true, scope.id)
                }}>Insert Row Above</div>
                <div className="scope_option" onClick={() => {
                    setIsComponentVisible(false)
                    handleScopeAddition(false, scope.id)
                }}>Insert Row Below</div>
                <div className="scope_option" onClick={() => {
                    setIsComponentVisible(false)
                    handleScopeRemoval(scope.id)
                }}>Remove Row</div>
            </div>}
        </div>
    )
}

export default Scope