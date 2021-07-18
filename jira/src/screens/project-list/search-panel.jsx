import React from 'react';
export const SearchPanel = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState({})
    return <from>
        <div>
            {/* setParam(Object.assign({}, param, {name:evt.target.value})) */}
            <input type='text' value='param.name' onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value='param.personID' onChange={evt=> setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </from>
}