import Scope from "./Scope"

const Sidebar = ({ scopes, handleScopeAddition, handleScopeRemoval, renameScope }) => {
    return (
        <div className="sidebar">
            <div className="sidebar_heading">
                Phases / Scopes
            </div>
            {scopes.map((scope, index) => {
                return <Scope
                    key={index}
                    scope={scope}
                    handleScopeAddition={handleScopeAddition}
                    handleScopeRemoval={handleScopeRemoval}
                    renameScope={renameScope} />
            })}
        </div>
    )
}

export default Sidebar