'use client'
import { useEffect, useState } from 'react'

interface StaffMember {
  id: string; name: string; role: string; email: string
  phone: string; department: string; status: 'active' | 'inactive'; joinedAt: string
}

interface FormState { name: string; role: string; email: string; phone: string; department: string; status: 'active' | 'inactive' }
const EMPTY_MEMBER: FormState = { name: '', role: '', email: '', phone: '', department: '', status: 'active' }

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<StaffMember | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_MEMBER)
  const [toast, setToast] = useState('')

  async function load() {
    const res = await fetch('/api/admin/staff')
    setStaff(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  function openAdd() {
    setEditing(null)
    setForm(EMPTY_MEMBER)
    setShowModal(true)
  }

  function openEdit(m: StaffMember) {
    setEditing(m)
    setForm({ name: m.name, role: m.role, email: m.email, phone: m.phone, department: m.department, status: m.status })
    setShowModal(true)
  }

  async function save() {
    const method = editing ? 'PUT' : 'POST'
    const payload = editing ? { ...form, id: editing.id } : form
    const res = await fetch('/api/admin/staff', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      await load()
      setShowModal(false)
      showToast(editing ? 'Staff updated' : 'Staff added')
    }
  }

  async function remove(id: string) {
    if (!confirm('Remove this staff member?')) return
    await fetch('/api/admin/staff', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
    showToast('Removed')
  }

  return (
    <div>
      <div className="ad-page-head">
        <div><h1>Staff</h1><p>{staff.length} team members</p></div>
        <button className="ad-btn ad-btn-primary" onClick={openAdd}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Staff
        </button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--ad-t3)', padding: '60px 0', textAlign: 'center' }}>Loading…</div>
      ) : staff.length === 0 ? (
        <div className="ad-empty">
          <div className="ad-empty-icon">👤</div>
          <div className="ad-empty-title">No staff yet</div>
          <div className="ad-empty-sub">Add your first team member to get started.</div>
          <button className="ad-btn ad-btn-primary" style={{ marginTop: 16 }} onClick={openAdd}>Add Staff Member</button>
        </div>
      ) : (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(m => (
                <tr key={m.id}>
                  <td className="td-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ad-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {m.name[0]?.toUpperCase()}
                      </div>
                      {m.name}
                    </div>
                  </td>
                  <td>{m.role}</td>
                  <td>{m.department}</td>
                  <td>
                    <div style={{ fontSize: 12 }}>
                      {m.email && <div>{m.email}</div>}
                      {m.phone && <div style={{ color: 'var(--ad-t3)' }}>{m.phone}</div>}
                    </div>
                  </td>
                  <td>
                    <span className={`ad-badge ${m.status === 'active' ? 'ad-badge-green' : 'ad-badge-gray'}`}>{m.status}</span>
                  </td>
                  <td style={{ fontSize: 12 }}>{new Date(m.joinedAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => openEdit(m)}>Edit</button>
                      <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={() => remove(m.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="ad-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="ad-modal">
            <div className="ad-modal-head">
              <div className="ad-modal-title">{editing ? 'Edit Staff Member' : 'Add Staff Member'}</div>
              <button className="ad-btn-icon ad-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="ad-modal-body">
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-label">Name *</label>
                  <input className="ad-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="ad-form-group">
                  <label className="ad-label">Role *</label>
                  <input className="ad-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required />
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-label">Department</label>
                  <input className="ad-input" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-label">Status</label>
                  <select className="ad-select" value={form.status} onChange={e => { const v = e.target.value as 'active' | 'inactive'; setForm(f => ({ ...f, status: v })) }}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-label">Email</label>
                  <input className="ad-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-label">Phone</label>
                  <input className="ad-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="ad-modal-foot">
              <button className="ad-btn ad-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="ad-btn ad-btn-primary" onClick={save}>{editing ? 'Update' : 'Add Member'}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  )
}
